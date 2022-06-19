import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { Request, Response } from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  //   (req: Request, res: Response)
  app.get("/filteredimage", async (req: Request, res: Response)=> {
      try{
          // Validate Img_Url
          const { image_url }: any = req.query
          const deleteImg: string[] = []
          if (!image_url) {
              return res.status(404).json({
                  message: "The image Url is Missing"
              })
          }
          // Filter Image
          const img =  await filterImageFromURL(image_url)
          deleteImg.push(img)
          res.status(200).sendFile(img)

          //I use setTimout to delay the deletion of the file
          setTimeout(function() {
               deleteLocalFiles(deleteImg)
          }, 1000);
          return
      } catch (err){
          res.status(400).send(err)
      }
  })

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("Welcome to the Image EndPoint")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
