import wixData from 'wix-data';
import {getpath} from "backend/path.web"
import wixSearch from 'wix-search';
import { local, session, memory } from 'wix-storage-frontend';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { files } from 'wix-media.v2'; //صفحة البروفايل
import {getFileUrl} from "backend/imageurl.web"
import wixLocationFrontend from 'wix-location-frontend';
import wixWindowFrontend from 'wix-window-frontend';
import {getimageUrl } from "backend/imgurl.web"
// local.setItem("id","666665656")

const idnumber = Number(local.getItem("id"));
const phonenumber = Number(local.getItem("phonenumber"));


// $w("#text137").text =

$w.onReady( function  () {
      
$w("#repeater7").hide()
$w("#text137").hide();

$w("#text138").hide();
    // console.log(idnumber + 4, phonenumber + 1)
    wixData.query("mgbgdyh5hhdk3b").eq("number1", phonenumber).eq("number", idnumber)
        .find().then(async (e) => {

try {
    console.log(e)
// console.log(e)
 const res =await getFileUrl(e.items[0].image);


$w("#image1").src=e.items[0].image;
console.log(res.fileUrl)
// $w("#sp")

} catch (error) {
    // $w("#image1").hide();
console.log(error)
}

                // local.setItem("document", e.items[0]);

try{
                $w("#text139").text = e.items[0].number.toString();
}catch(e){
         $w("#text139").text = "لا يوجد بيانات";

}
   try {

                $w("#text137").text = e.items[0].text;
    $w("#text137").show();
   } catch (error) {
                $w("#text137").text = " لا يوجد بيانات";

   }
   try {
                $w("#text138").text = e.items[0].number1.toString();
$w("#text138").show();

   } catch (error) {
                $w("#text138").text = "لا يوجد بيانات";

   }
   try {
                $w("#text144").text = e.items[0].newField1;

   } catch (error) {
                $w("#text144").text = "لا يوجد بيانات";

   }
//    try {
//                 $w("#text140").text = e.items[0].newField;

//    } catch (error) {
//                 $w("#text140").text = "لا يوجد بيانات";

//    }
   const objlist = [];
   const obj = {};
try {
    // console.log(e.items[0].arraydocument)
    if (e.items[0].arraydocument == undefined) return $w("#box6").hide()

   e.items[0].arraydocument.map((n,i)=>{
   obj._id = i.toString()
   obj.link = e.items[0].arraydocument[i]
//    console.log(obj)
   objlist.push({...obj})}

    )

    const arr = objlist
// console.log(objlist)
$w("#repeater7").show();
     $w("#repeater7").data = objlist;
    //  console.log($w("#repeater7").data)
     $w('#repeater7').onItemReady(async  ($item, itemData, index) => {
        //  console.log(item,itemData)

const resobj =await getFileUrl(itemData.link);
const numb = index + 1 ;
// console.log(res.fileUrl)
    // $item("#text12").text =numb.toString();
    // console.log(getpath(res.originalFileName));
    $item("#text146").text =await getpath(resobj.originalFileName);

    // $item("#text146").text =resobj.originalFileName;




    if(resobj.mediaType !== "document"){
const img = await getimageUrl(itemData.link)
     $item('#button13').link = img;

    }
    // $item('#button13').link = resobj;

    $item('#button13').link = resobj;

    $item('#button13').link = itemData.link
    // $item('#button13').onClick(e=>{ wixLocation.to(itemData.link)})

    // console.log(res);


  } );

    // e.items[0].arraydocument.map(e=>$w("Document")[1])
} catch (error) {
console.log(error)
    //    $w("#box6")//;
}

  const objlistarraydocumentone = [];
   const objarraydocumentone = {};
try {

    console.log(e.items[0])

   e.items[0].arraydocument1.map((n,i)=>{
   objarraydocumentone._id = i.toString()
   objarraydocumentone.link = e.items[0].arraydocument1[i]
   console.log(obj)
   objlistarraydocumentone.push({...objarraydocumentone})}

    )

    const arr = objlistarraydocumentone
console.log(objlistarraydocumentone)
$w("#repeater8").show();
     $w("#repeater8").data = objlistarraydocumentone;
    //  console.log($w("#repeater8").data)
     $w('#repeater8').onItemReady(async  ($item, itemData, index) => {
        //  console.log(item,itemData)

const res =await getFileUrl(itemData.link);
const numb = index + 1 ;
// console.log(res.fileUrl)
    // $item("#text12").text =numb.toString();
    // console.log(getpath(res.originalFileName));
    $item("#text147").text =await getpath(res.originalFileName);



    if(res.mediaType !== "document"){
const img = await getimageUrl(itemData.link)
     $item('#button14').link = img;

    }
    try {
        
    $item('#button14').link = res;
    } catch (error) {
        console.log(error)
    }

    $item('#button14').link = itemData.link;

    // $item('#button13').target = itemData.link
    // $item('#button13').onClick(e=>{ wixLocation.to(itemData.link)})

    // console.log(res);


  } );

    // e.items[0].arraydocument.map(e=>$w("Document")[1])
} catch (error) {
   console.log(error)
//    $w("#box7")//;
}













const objlistarraydocumenttwo = [];
   const objarraydocumenttwo = {};
try {
    console.log(!e.items[0].arraydocument11)
   e.items[0].arraydocument11.map((n,i)=>{
   objarraydocumenttwo._id = i.toString()
   objarraydocumenttwo.link = e.items[0].arraydocument11[i]
   console.log(obj)
   objlistarraydocumenttwo.push({...objarraydocumenttwo})}

    )

    const arr = objlistarraydocumenttwo
console.log(objlistarraydocumenttwo)
$w("#repeater9").show();
     $w("#repeater9").data = arr;
    //  console.log($w("#repeater8").data)
     $w('#repeater9').onItemReady(async  ($item, itemData, index) => {
        //  console.log(item,itemData)
const res =await getFileUrl(itemData.link);
const numb = index + 1 ;
console.log(res.fileUrl)
    // $item("#text12").text =numb.toString();
    // console.log(getpath(res.originalFileName));
    $item("#text148").text =await getpath(res.originalFileName);



    if(res.mediaType !== "document"){
const img = await getimageUrl(itemData.link)
     $item('#button15').link = img;

    }


    $item('#button15').link = itemData.link;
    $item('#button15').link = res;

    // $item('#button13').target = itemData.link
    // $item('#button13').onClick(e=>{ wixLocation.to(itemData.link)})

    console.log(res);


  } );

    // e.items[0].arraydocument.map(e=>$w("Document")[1])
} catch (error) {
    console.log(error)
}









const objlistarraydocumentcon = [];
   const objarraydocumentcon = {};
try {
    console.log(e.items[0].arraydocument11)
    if (e.items[0].arraydocument11 == undefined) return $w("#box8").hide()

   e.items[0].arraydocument2.map((n,i)=>{
   objarraydocumentcon._id = i.toString()
   objarraydocumentcon.link = e.items[0].arraydocument2[i]
   console.log(obj)
   objlistarraydocumentcon.push({...objarraydocumentcon})}

    )

    const arr = objlistarraydocumentcon
console.log(objlistarraydocumentcon)
$w("#repeater11").show();
     $w("#repeater11").data = objlistarraydocumentcon;
    //  console.log($w("#repeater8").data)
     $w('#repeater11').onItemReady(async  ($item, itemData, index) => {
        //  console.log(item,itemData)

const res =await getFileUrl(itemData.link);
const numb = index + 1 ;
console.log(res.fileUrl)
    // $item("#text12").text =numb.toString();
    console.log(getpath(res.originalFileName));
    $item("#text12").text =await getpath(res.originalFileName);



    if(res.mediaType !== "document"){
const img = await getimageUrl(itemData.link)
     $item('#button17').link = img;

    }

try {
    $item('#button17').link = res;
    
} catch (error) {
console.log(error)    
}

    $item('#button17').link = itemData.link;

    // $item('#button13').target = itemData.link
    // $item('#button13').onClick(e=>{ wixLocation.to(itemData.link)})

    console.log(res);


  } );

    // e.items[0].arraydocument.map(e=>$w("Document")[1])
} catch (error) {
//    $w("#box8")//;
}






const objlistarraydocumentthree = [];
   const objarraydocumentthree = {};
try {
    if (e.items[0].arraydocument111 == undefined) return $w("#box9").hide()
    console.log(e.items[0].arraydocument111)
if (e.items[0].arraydocument11.length >0) {
   e.items[0].arraydocument111.map((n,i)=>{
   objarraydocumentthree._id = i.toString()
   objarraydocumentthree.link = e.items[0].arraydocument111[i]
   console.log(obj)
   objlistarraydocumentthree.push({...objarraydocumentthree})}

    )

    const arr = objlistarraydocumentthree
console.log(objlistarraydocumentthree)
$w("#repeater10").show();
     $w("#repeater10").data = arr;
    //  console.log($w("#repeater8").data)
     $w('#repeater10').onItemReady(async  ($item, itemData, index) => {
        //  console.log(item,itemData)

const res =await getFileUrl(itemData.link);
const numb = index + 1 ;
    // $item("#text12").text =numb.toString();
    console.log(getpath(res.originalFileName));
    // $item("#text146").text =await getpath(res.originalFileName);

$item("#text149").text=res.originalFileName

    if(res.mediaType !== "document"){
const img = await getimageUrl(itemData.link)
     $item('#button16').link = img;

    }
    $item('#button16').link = res;

    $item('#button16').link = itemData.link;

    // $item('#button13').target = itemData.link
    // $item('#button13').onClick(e=>{ wixLocation.to(itemData.link)})



  } );}else {

        $w("#box9").hide()
    }
  

    // e.items[0].arraydocument.map(e=>$w("Document")[1])
} catch (error) {
   //;
   console.log(error)
}


























        }).catch(e => {
wixLocationFrontend.to("/تسجيل-الدخول")
            console.log("members not found");

        });



})




function container5_click(event) {

}

export function logout(event) {
local.removeItem("id")
local.removeItem("phonenumber")
    local.clear();
wixLocationFrontend.to("/تسجيل-الدخول")
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
}

/**
*	Adds an event handler that runs when an element is displayed
 in the viewable part of the current window.
	[Read more](https://www.wix.com/corvid/reference/$w.ViewportMixin.html#onViewportEnter)
*	 @param {$w.Event} event
*/


/**
*	Adds an event handler that runs when an element is displayed
 in the viewable part of the current window.
	[Read more](https://www.wix.com/corvid/reference/$w.ViewportMixin.html#onViewportEnter)
*	 @param {$w.Event} event
*/
export function button15_viewportEnter(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here:
}
