async function include(element, page)
{
    var contentObject = await fetch(page);
    var contentHTML = await contentObject.text();
    element.innerHTML = contentHTML;
}
function includeAll()
{
    document.querySelectorAll(
        "[include-data").forEach(
            el => include(el, el.getAttribute("include-data"))
        );
}