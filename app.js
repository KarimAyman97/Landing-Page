let Navigationbar = document.querySelector("#navigation-menu");
let allSections = document.querySelectorAll("section");

// Create Navbar with navItems = number of section appears in the landing page
function CreateNavBar() 
{
	allSections.forEach(function createLinks(element)
    {
	    let navItem = document.createElement("li");
	    navItem.classList.add("item-list");
    	let section = element.getAttribute("data-nav");
    	let inUseSectionId = element.getAttribute("id");
        navItem.innerHTML = `<a class=navigation-link data-nav="${inUseSectionId}" href="#${inUseSectionId}" >${section}</a>`;
        Navigationbar.appendChild(navItem);
    });
}


// this function makes when you press the nav item to scoll down to its refered section the scroll become smoother than usual 
// it make UI forthe user be better than blinking to section  that would annoy the user ...
// also is goes to the center of the section 
function sectionScroll() 
{
    let links = document.querySelectorAll(".navigation-link");
    links.forEach(function goOnClick(element) 
    {
        element.addEventListener("click", function(event) 
        {
            event.preventDefault();
            document.getElementById(`${event.target.dataset.nav}`)
            .scrollIntoView({ behavior: "smooth" , block:"center"});
        });
    });
}

CreateNavBar() ;

sectionScroll();


//this function is continous checking during scroll 
//it is used to detect if section is in view so we will change its css style 
function checkIfSectionIsInView(section) 
{
	let rectangle = section.getBoundingClientRect();
	return (rectangle.top >= 0 && rectangle.left >= 0 && rectangle.right <= (window.innerWidth || document.documentElement.clientWidth) 
            && rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight));
};


//Cancel in use sections when transition occurs between them  
//ut of view sections will be return is original style to it 
function cancel_OutofFocus_Section() 
{
    allSections.forEach(function cancelUse(element)
    {
        element.classList.remove("inFocusSection");
        element.classList.add("section-view");
    }); 
}



// Adding class to a section after checking if it is in use
// Remove out of focus section from the styling class 
function Style_InFocus_Section(section) 
{
    section.classList.remove("section-view") ;

    section.classList.add("inFocusSection");
    //Cancel outOfFocus links
    cancelInUseLink();
    //Use the InFocus links
    StyleInUseLink(section.getAttribute('id'));
}

//cancel in outofFocus links when transition occurs
// style the link where its section is in focus
function cancelInUseLink() 
{
    let links = document.querySelectorAll(".inFocusLink");
    links.forEach(function cancelUsage(element)
    {
        element.classList.remove("inFocusLink");
        element.classList.add("navigation-link");
    });
}

// Adding "inUseLink" class to a section after checking if it is in use
function StyleInUseLink(SectionId) 
{
    let links = document.querySelectorAll(".navigation-link");

    links.forEach(function addInUse(element)
    {
        if(element.getAttribute('href') == `#${SectionId}`) 
        {
            element.classList.remove("navigation-link");
            element.classList.add("inFocusLink");
        }
    });
}


// this add event listener to the window on each scroll to change the styling of the section and navbar 
window.addEventListener('scroll', function (event) 
{
	event.preventDefault();
    allSections.forEach(function highlight(element) 
    {
        if (checkIfSectionIsInView(element)) 
        {
            cancel_OutofFocus_Section();
            Style_InFocus_Section(element);

        } 
        else if(window.scrollY==0) 
        {
            cancel_OutofFocus_Section();
            cancelInUseLink();
        }
    });
});