import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
import express from "express"
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import fs from "fs"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express()
const PORT = process.env.PORT
console.log("port no ==> ", PORT)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {

    //sync way : write to a file

    //syntax : fs.writeFileSync(file, data)

    fs.writeFileSync("./sample.txt", "1")
    fs.writeFileSync("./sample.txt", "2")// over writes the previous value : 1


    //async way to write : cb is present

    fs.writeFile("./sample.txt", "3 ", (err) => {
        //It only returns err and no data in the callback.
        if (err) {
            console.error("Error writing file:", err);
        } else {
            // read file sync way : utf-8 is imp otherwise will get raw stream
            const result = fs.readFileSync("./sample.txt", "utf-8")
            console.log("result of synchronously reading 1==>", result)

            //append

            fs.appendFileSync("./sample.txt", new Date().getDate().toLocaleString())

            //copy file
            fs.cpSync("./sample.txt","./sample2.txt")

            //delete
            // fs.unlinkSync("./sample2.txt")

            //make directory

            fs.mkdirSync("a/b",{recursive:true})
        }
    })


    // read files sync way

    const result = fs.readFileSync("./sample.txt", "utf-8") // gives you result instantly
    console.log("result of synchronously reading==>", result)

    // asynchronously reading : expects a cb

    fs.readFile("./sample.txt", "utf-8", (err, data) => { // need cb to get data
        //It  returns both  err and data in the callback.
        if (err) {
            console.error("Error reading file:", err);
        } else {
            console.log("data from async read ==>", data)
        }
    })

})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} port no!`)
})


