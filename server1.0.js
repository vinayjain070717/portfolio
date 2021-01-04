var expressUtility=require("express")
var httpServerFactory=require("http")
var pathUtilities=require("path")
var fileSystemUtilities=require("fs")
var session=require("express-session")

var server=expressUtility();
var httpServer=httpServerFactory.createServer(server)
server.use("/js",expressUtility.static("./js/"))
server.use("/css",expressUtility.static("./css/"))
server.use("/images",expressUtility.static("./images/"))
server.use("/fonts",expressUtility.static("./fonts/"))
server.use("/data",expressUtility.static("./data/"))
server.use(expressUtility.static(process.cwd()+"/showcase-app/"))

var requests=new Map();
requests.set("/","/showcase-app/index.html")
requests.set("/showcase","/home.html");
requests.set("/addProject","/AddProjectPage.html")
for(let [key, value] of requests){
server.get(key, function(req, res) {
		res.sendFile(pathUtilities.join(__dirname+value));
})
}

server.use(session({
	key:"home shopping session",
	secret:"1234",
	resave:false,
	saveUninitialized:false
}))
server.get("/showcase/projectsInfo",function(req,res){
	let data={}
	var sequenceOfProjects=JSON.parse(fileSystemUtilities.readFileSync(__dirname+"/data/SequenceOfProjects.json").toString());
	// console.log(sequenceOfProjects)
	let a=[];
	let serialNumber=1;
	sequenceOfProjects["Projects"].forEach(function(project){
		let projectJSON=JSON.parse(fileSystemUtilities.readFileSync(__dirname+"/data/projects/"+project).toString());
		projectJSON["serialNumber"]=serialNumber;
		serialNumber+=1
		a.push(projectJSON)
	})
	data["result"]=a;
	res.end(JSON.stringify(data))
	// fileSystemUtilities.readdir(__dirname+"/data/projects",function(err,files){
	// 	if(err) throw err;
	// 	let a=[]
	// 	files.forEach(function(file){
	// 		a.push(JSON.parse(fileSystemUtilities.readFileSync(__dirname+"/data/projects/"+file).toString()));
	// 	})
	// 	data["result"]=a
	// 	res.end(JSON.stringify(data))

	// })
})
var port=process.env.PORT || 3000
console.log("Server is listening on port "+port)

server.listen(port)