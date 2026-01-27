
function correctPath(path)
{
    console.log("current path: ", path);
    var parts = window.location.pathname.split("/").filter(part => part);
    var depth = 0;
    for (let i = 0; i < parts.length -1; i++)
    {
        if(parts && parts !== "index" && parts !== "index.html" 
            && i > 0)
        {
            depth += 1;
        }
    }
    console.log("full pathname: ", window.location.pathname);
    console.log("current depth: ", parts);
    var prepend = "";
    for(var i=0; i< depth; i++)
    {
        prepend += "../";
    }
    console.log("prepended path: ", prepend + path);
    return prepend + path;
}
/*
function updatePaths()
{
    let includeLinks = document.querySelectorAll("[data-include]");
    console.log("data-include links: ", [includeLinks]);
    includeLinks.forEach((link) =>
    {
        let correctedPath = correctPath(link.getAttribute("data-include"));
        console.log("correctedPath: ", correctedPath);
        link.setAttribute("data-include", correctedPath);
    });
    
    let cssLinks = document.querySelectorAll("#cssLinks");
    cssLinks.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
    
    let jsLinks = document.querySelectorAll("#jsLinks");
    jsLinks.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("src"));
        link.setAttribute("src", correctedPath);
    });
    
    let navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) =>{
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
}
*/

async function include(element, page)
{
    var contentObject = await fetch(page);
    var contentHTML = await contentObject.text();
    element.innerHTML = contentHTML;

    let navLinks = element.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
    
}
function includeAll()
{
    let includeLinks = document.querySelectorAll("[data-include]");
    includeLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("data-include"));
        link.setAttribute("data-include", correctedPath);
    })

    document.querySelectorAll(
        "[data-include]").forEach(
            el => include(el, el.getAttribute("data-include"))
    );
}
/*
async function include(element, page)
{
    var contentObject = await fetch(page);
    var contentHTML = await contentObject.text();
    element.innerHTML = contentHTML;
    
    // FIX: Update navigation links AFTER the content is loaded
    let navLinks = element.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("href"));
        link.setAttribute("href", correctedPath);
    });
}

function includeAll()
{
    // Only update the include paths, not nav links yet
    let includeLinks = document.querySelectorAll("[data-include]");
    includeLinks.forEach((link) => {
        let correctedPath = correctPath(link.getAttribute("data-include"));
        link.setAttribute("data-include", correctedPath);
    });
    
    document.querySelectorAll("[data-include]").forEach(
        el => include(el, el.getAttribute("data-include"))
    );
}
*/