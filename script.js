/ UNIVERSAL BUTTON HANDLER – works by button text
document.addEventListener("DOMContentLoaded", function() {

    // Helper: find button by text (case-insensitive)
    function findButton(text) {
        let btns = document.querySelectorAll("button");
        for (let btn of btns) {
            if (btn.innerText.toLowerCase().includes(text.toLowerCase())) {
                return btn;
            }
        }
        return null;
    }

    // Apply Filters button
    let filterBtn = findButton("apply filters");
    if (filterBtn) {
        filterBtn.onclick = function(e) {
            e.preventDefault();
            alert("Filters applied! (demo)");
        };
    }

    // View Details buttons
    let viewBtns = document.querySelectorAll("button");
    for (let btn of viewBtns) {
        if (btn.innerText.toLowerCase().includes("view details")) {
            btn.onclick = function() {
                alert("More property details coming soon.");
            };
        }
    }

    // Apply Now buttons (already working)
    let applyNow = document.querySelectorAll(".apply-now");
    for (let btn of applyNow) {
        btn.onclick = function() {
            let property = this.closest(".rental-card, .property-card");
            let name = property ? property.querySelector("h3").innerText : "this property";
            if (confirm("Apply for " + name + "? Click OK to go to contact page.")) {
                window.location.href = "contact.html";
            }
        };
    }

    // Load More button
    let loadMore = findButton("load more");
    if (loadMore) {
        loadMore.onclick = function() {
            alert("More results would load here.");
        };
    }

    // Forms...
    let valuationForm = document.querySelector("#valuation-form, .form-box form");
    if (valuationForm) {
        valuationForm.onsubmit = function(e) {
            e.preventDefault();
            alert("Valuation request sent! We'll reply in 24h.");
            valuationForm.reset();
        };
    }

    let contactForm = document.querySelector("#contact-form, .contact-form-box form");
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            alert("Message sent! We'll get back to you soon.");
            contactForm.reset();
        };
    }

    console.log("Universal script loaded – all buttons should work now.");
});