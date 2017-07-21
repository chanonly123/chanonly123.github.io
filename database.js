var cat1 = {
    title:"All", 
    catId:"1"
};
var cat2 = {
    title:"Arguments", 
    catId:"2"
};
var cat3 = {
    title:"Culture", 
    catId:"3"
};
var cat4 = {
    title:"Economy", 
    catId:"4"
};
var cat5 = {
    title:"Environment", 
    catId:"5"
};
var cat6 = {
    title:"Science and Technology", 
    catId:"6"
};

var allArrayCat = [cat1, cat2, cat3, cat4, cat5, cat6];

var essay1 = {
    title:"Title 1",
    description:"Description 1",
    image:"images/pic_1.jpg",
    catId:"1"
};

var essay2 = {
    title:"Title 2",
    description:"Description 2",
    image:"images/pic_2.jpg",
    cat:"2"
};

var aLLArrayItems = [essay1, essay2];
//end of database

// functions to adding, filtering items
function filteredItems(catId) {
    console.log("filteredItems")
    var array = []
    for (i = 0; i < aLLArrayItems.length; i++) {
        var essay = items[i]
        if(essay.catId == catId) {
            array.append(essay)
        }
    }
}
function addInjectCardItems(items) {
    console.log("addInjectCardItems")
    for (i = 0; i < items.length; i++) {
    var essay = items[i]
        $("#item_container").append(
                    '<article class="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-xxs-12 animate-box">  '  + 
            '   				<figure>  '  + 
            '   					<a href="single.html"><img src="' + essay.image + '" alt="Image" class="img-responsive"></a>  '  + 
            '   				</figure>  '  + 
            '   				<span class="fh5co-meta"><a href="single.html">' + essay.title + '</a></span>  '  + 
            '   				<h2 class="fh5co-article-title"><a href="single.html">' + essay.description + '</a></h2>  '  + 
            '   				<span class="fh5co-meta fh5co-date">March 6th, 2016</span>  '  + 
            '  			</article>' 
        )
    }
}

// functions to creating categories
function createAndInjectCategory() {
    console.log("createAndInjectCategory")
    for (i = 0; i < allArrayCat.length; i++) {
        var cat = allArrayCat[i]
        var catButtonId = 'bCat' + cat.catId
        var catId = cat.catId
        $("#categoryHolder").append('<li id="' + catButtonId + '"><a href="#">' + cat.title + '</a></li>')
        
        var id = '#'+catButtonId
        $(id).click(categoryCallBack(cat.catId));
    }    
}
function categoryCallBack(catId) {
    return function(){
        console.log('clicked ' + catId)
    }
}

function setupSideBar() {

}

function navBarOpenListener () {
    console.log('nav navBarOpenListener')
}

function navBarCloseListener () {
    console.log('nav navBarCloseListener')
}

// start excution first itme only
createAndInjectCategory()
setupSideBar()
addInjectCardItems(aLLArrayItems);