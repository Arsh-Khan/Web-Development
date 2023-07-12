
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request){
// Replace the uri string with your connection string.

const query = request.nextUrl.searchParams.get("query")

const uri =
  "mongodb+srv://nextjs-tut:5SMyAJ4JEKDPcs4G@cluster0.3ijbhmd.mongodb.net/";

const client = new MongoClient(uri);

  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');

    const products = await inventory.aggregate([{
        $match:{
            $or:[
                { slug: { $regex: query, $options: "i"}},
            ]
        }
    }]).toArray()

    return NextResponse.json({success:true,products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}