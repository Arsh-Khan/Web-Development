import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request){
    // Replace the uri string with your connection string.
    let {action,slug,initialQuantity} = await request.json()
    // console.log(body)
    const uri =
      "mongodb+srv://nextjs-tut:5SMyAJ4JEKDPcs4G@cluster0.3ijbhmd.mongodb.net/";
    
    const client = new MongoClient(uri);
    
    try {
        const database = client.db('stock');
        const inventory = database.collection('inventory');
    
        // create a filter for a movie to update
    
        const filter = { slug: slug };
    
        let newQuantity = action =="plus"?(parseInt(initialQuantity+1)):(parseInt(initialQuantity-1))

        const updateDoc = {
    
          $set: {
    
            quantity:newQuantity,
    
          },
    
        };
    
        const result = await inventory.updateOne(filter, updateDoc, {});
    
        return NextResponse.json({success:true,message:`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`})
      } finally {
    
        await client.close();
    
      }
    }
    