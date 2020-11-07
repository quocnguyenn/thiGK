const express= require("express")
const aws = require("aws-sdk")
const bodyparser=require("body-parser")
const app =express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json({extended:false}));
app.set("view engine","ejs");
app.set("views","./views");

const region = "us-east-2";
const accessKeyId="";
const secretAccessKey="";

const dynamoDB= new aws.DynamoDB.DocumentClient({
    region :region,
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey,
});
app.listen(3000,(err)=>{
    if(err)
        console.log("loi",err);
    else
        console.log("server running port 3000");
})
// get danh sach san pham
app.get("/",(req,res)=>{
    const paramDanhSach={
        TableName:"sanpham"
    };
    dynamoDB.scan(paramDanhSach,(err,data)=>{
        if(err)
            console.log(JSON.stringify(err,null,2));
        else
            res.render("index",{
                sanpham:data.Items
            });
    })
});
//xóa
app.post("/delete",(req,res)=>{
    const maSP= req.body.maSP;
    const paramXoa={
        TableName:"sanpham",
        Key:{
            "maSP":maSP,
        },
    };
    dynamoDB.delete(paramXoa,(err,data)=>{
        if(err){
            console.log(err);
 //           res.json({msg:"Xóa không thành công"});
        } 
        else{
            res.redirect("/");
 //           res.json({msg:"Xóa thành công"});
        }
           
    })
});
