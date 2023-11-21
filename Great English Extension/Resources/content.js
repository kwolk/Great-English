
//Great English
//
//Created by Samuel Corke on 19/11/2023.

// FIXME: TOOLBAR ICON IS HARD TO DEFINE : SIMPLIFY svp.
// FIXME: COMPATIBILITY : iOS && iPad
// FIXME: ON-HOVER POP-UP BUBBLE TEXT DOES NOT CHANGE (WIKIPEDIA)
// FIXME: MORE INTELLIGENT LOGIC NEEDED TO PREVENT FOOTER "Cookie statement" (PRIVACY) CHANGING TO "Biscuit statement" :))
// FIXME: CONTEXT LOGIC NEEDED FOR WORDS LIKE "Check" OR "Line" : WHICH IS ONLY VERY RARELY "Cheque" and "Queue"
// FIXME: CONTEXT LOGIC NEEDED FOR BRANDING LIKE "Subway"
// FIXME: PLURAL WORDS ESCAPE THE FILTER e.g. "Trucks" ("Truck")
//
// TODO: CONVERT TIME CODES TO GMT : "9:00pm EST"
// TODO: CONVERT METRIC TO IMPERIAL MEASUREMENTS (CONTEXT : JAMES COOK'S HEIGHT c18th)
// TODO: CONVERT CURRENCY : $29.99 -> £24.05 (20th Nov, '23)
// TODO: A SLAG DICTIONARY COULD BE TOO MUCH OF A DISTRACTION ?
// TODO: ANALYSE HTML/JS TO AVOID TUTORIAL SITE CODE SAMPLES e.g. ".color = .red"


// ICON
// <a href="https://www.flaticon.com/free-icons/usa" title="usa icons">Usa icons created by Freepik - Flaticon</a>
// 


// US : UK (20th November 2023)
const wordReplacementMap = {
    "Apartment"     : "Flat",
    "Attorney"      : "Barrister",
    "Awesome"       : "Brilliant",
    "Candy"         : "Sweets",
    "Cell Phone"    : "Mobile",
    "Center"        : "Centre",
    "Chemist"       : "Pharmacy",       // nb. I UNDERSTAND THAT THIS IS NOT SO, BUT IT IS COLLOQUIAL
    "Cinema"        : "Movie Theater",
    "Color"         : "Colour",
    "Cookie"        : "Biscuit",        // nb. PRIVARY STATEMENTS NOW READ : "Biscuit Statement" - AS IT WELL SHOULD ;)
    "Cotton Candy"  : "Candyfloss",
    "Defense"       : "Defence",
    "Diaper"        : "Nappy",
    "Dumpster"      : "Skip",
    "Elevator"      : "Lift",           // nb. COULD BE USED AS AN ADJECTIVE ?
    "Favorite"      : "Favourite",
    "Flashlight"    : "Torch",
    "Flatmate"      : "Roommate",
    "Fries"         : "Chips",
    "Garbage"       : "Dustbin",
    "Garbage can"   : "Bin",            // FIXME: COULD CONFLICT WITH JUST "GARBAGE" ?
    "Gasoline"      : "Petrol",
    "Guy"           : "Chap",           // nb. COULD BE CONFUSED WITH SOMEBODY'S NAME ?
    "Hire"          : "Rent",
    "Jello"         : "Jelly",
    "Jewelry"       : "Jewellery",
    "Lawyer"        : "Solicitor",
    "Liter"         : "Litre",
    "Mail"          : "Post",
    "Movie Theater" : "Cinema",
    "Neighbor"      : "Neighbour",
    "Parking lot"   : "Car park",
    "Plow"          : "Plough",
    "Potato Chips"  : "Crisps",
    "Sidewalk"      : "Pavement",
    "Sneakers"      : "Trainers",
    "Soccer"        : "Football",
    "Subway"        : "Tube",           //FIXME: BRAND NAME !
    "Sweater"       : "Jumper",
    "Theater"       : "Theatre",
    "Tic Tac Toe"   : "Noughts & crosses",
    "Tic-Tac-Toe"   : "Noughts & crosses",
    "Traffic Circle": "Roundabout",
    "Truck"         : "Lorry",
    "Vacation"      : "Holiday",
    "Windshield"    : "Windscreen",
    
    // SLAG TERRITORY
    "2A"            : "Second Amendment",
    "2K18"          : "2018",
    "Brit"          : "British",
    "Brits"         : "British",
    "Britt"         : "British",
    "The Brits"     : "The British",
    "Haz"           : "Have"
    
    
    // FIXME: DIFFICULT WITHOUT CONTEXT (NATURAL LANGUAGE LOGIC svp.)
    /*
    "Check"         : "Cheque",
    "Chips"         : "Potato Chips",
    "Flat"          : "Apartment",
    "Line"          : "Queue",
    "Pants"         : "Trousers",
    "Yard"          : "Garden",
     */
};


let wordsReplaced = []

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.update != "update")
        return;

    const found = " words ya'll a missin'"
    const missing = "Y'all ain't missin' nothin'"
    
    // CONVERT ALL WORDS TO Title Case (PREVENTS LOWER CASE FROM SLIPPING THROUGH NET && MORE PRESENTABLE FOR READOUT)
    const convertedArray = convertArrayToTitleCase(wordsReplaced);
    
    // REMOVE DUPLICATES
    const strippedArray = Array.from(new Set(convertedArray));
    
    // ORDER ALPHABETICALLY
    const orderedArray = strippedArray.sort();
    
    // ENSURE THAT IF NO WORDS HAVE BEEN SUBSTITUTED THEN ALTERNATIVE TITLE IS SHOWN
    const titleContent = (wordsReplaced.length === 0) ? missing : orderedArray.length + found
    

    sendResponse({
        title: titleContent,
        substituted: orderedArray.join(', ')    // SEPARATE LISTING BY COMMA
    });
});



// REPLACE WORD
function replace(node, withWord, replacementWord) {
    switch (node.nodeType)
    {
        case Node.ELEMENT_NODE:
            
            // AVOID INPUT FIELDS
            if (node.tagName.toLowerCase() === "input" || node.tagName.toLowerCase() === "textarea") {
                return;
            }
 
        // FALL THROUGH ELEMENT NODES TO ITERATE OVER CHILDREN
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            
            // ANALYSE CONTAINER FORMAT FOR POSSIBLE TARGETS
            var child = node.firstChild;            // INITIALISE THE FIRST CHILD NODE OF THE CURRENT NODE
            var next = undefined;                   // STORE A REFERENCE TO NEXT SIBLING OF THE CURRENT CHILD NODE BEFORE MODIFICATIONS
            while (child) {
                next = child.nextSibling;           // SAVE REF TO NEXT SIBLING OF CURRENT CHILD NODE BEFORE CHANGES TO DOM (PRESERVING ORIGINAL STRUCTURE)
                replace(child, withWord, replacementWord);
                child = next;                       // REFERENCE SAVED NEXT SIBLING (PRESERVING ORIGINAL STRUCTURE)
            }
            break;
        
        // TEXT NODE TARGET
        case Node.TEXT_NODE:
            substituteTextInTextNode(node, withWord, replacementWord);
            break;
    }
}
 

// ANALYSE WORD AND SUBSTITUTE
function substituteTextInTextNode(textNode, withWord, replacementWord, sendResponse) {
    
    // IGNORE ANYTHING THAT ISN'T A TEXT NODE
    if (textNode.nodeType !== Node.TEXT_NODE)
        return;
    
    // IGNORE EMPTY TEXT NODE(S)
    if (!textNode.nodeValue.length)
        return;
    

    // HELPER : WHOLE WORDS && CASE SENSITIVE:
    // "\\b"  : MATCHES WHOLE WORD (NOT PARTIALLY)
    // "g"    : CHECK OVER WHOLE STRING VALUE
    // "i"    : CASE SENSITIVE
    function generateRegExp(withWord) {
        return new RegExp('\\b' + withWord + '\\b', 'gi');
    }

    
    // SORT BY CASE AND RETURN SUBSTITUE WORD
    function replaceCallback(matchedWord) {
        
        // CASE : LOWER
        if (matchedWord === matchedWord.toLowerCase()) {
            wordsReplaced.push(matchedWord);
            return replacementWord.toLowerCase();
        
        // CASE : HIGHER
        } else if (matchedWord === matchedWord.toUpperCase()) {
            wordsReplaced.push(matchedWord);
            return replacementWord.toUpperCase();
        
        } else {
            // CASE : OTHER
            wordsReplaced.push(matchedWord);
            return replacementWord;
        }
    }

    // CONVERT THE NODE FROM US TO UK ENGLISH
    var expressionForWordToReplace = generateRegExp(withWord);
    var nodeValue = textNode.nodeValue;
    var newNodeValue = nodeValue.replace(expressionForWordToReplace, replaceCallback);
    
    // FINAL COMPARISON CHECK THAT WORDS DIFFER BEFORE COMITTING
    if (nodeValue !== newNodeValue) {
        textNode.nodeValue = newNodeValue;
    }
}


// SCOUR PAGE FOR OFFENDING WORDS (HOPEFULLY NOT TOO RESOURCE INTENSIVE)
for (var wordToReplace in wordReplacementMap) {
    replace(document.body, wordToReplace, wordReplacementMap[wordToReplace]);
}



//////////////////////////
//// HELPER FUNCTIONS ////
//////////////////////////

// HELPER : INTERROGATE DATA AND MANIPULATE:
// "w"  : MATCHES WORD
// "S*" : NON-WHITESPACE CHARS
// "g"  : REPEAT CHECK OVER WHOLE STRING VALUE (TO LOWER CASE)
function convertToTitleCase(withWord) {
    return withWord.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();   // FIRST CHAR CONVERTED TO UPPER CASE : REMAINDER TO LOWER
    });
}

// HELPER : CONVERT TO Title Case
function convertArrayToTitleCase(fromWords) {
    return fromWords.map(function(word) {
        return convertToTitleCase(word);
    });
}

    



////////////////////////////////////////////////
//// EXPERIMENTAL : HIGHLIGHT CHANGED WORDS ////
////////////////////////////////////////////////
//
//https://stackoverflow.com/questions/8644428/how-to-highlight-text-using-javascript
//
///**
// * Highlight keywords inside a DOM element
// * @param {string} elem Element to search for keywords in
// * @param {string[]} keywords Keywords to highlight
// * @param {boolean} caseSensitive Differenciate between capital and lowercase letters
// * @param {string} cls Class to apply to the highlighted keyword
// */
//function highlight(elem, keywords, caseSensitive = false, cls = 'highlight') {
//  const flags = caseSensitive ? 'gi' : 'g';
//  // Sort longer matches first to avoid
//  // highlighting keywords within keywords.
//  keywords.sort((a, b) => b.length - a.length);
//  Array.from(elem.childNodes).forEach(child => {
//    const keywordRegex = RegExp(keywords.join('|'), flags);
//    if (child.nodeType !== 3) { // not a text node
//      highlight(child, keywords, caseSensitive, cls);
//    } else if (keywordRegex.test(child.textContent)) {
//      const frag = document.createDocumentFragment();
//      let lastIdx = 0;
//      child.textContent.replace(keywordRegex, (match, idx) => {
//        const part = document.createTextNode(child.textContent.slice(lastIdx, idx));
//        const highlighted = document.createElement('span');
//        highlighted.textContent = match;
//        highlighted.classList.add(cls);
//        frag.appendChild(part);
//        frag.appendChild(highlighted);
//        lastIdx = idx + match.length;
//      });
//      const end = document.createTextNode(child.textContent.slice(lastIdx));
//      frag.appendChild(end);
//      child.parentNode.replaceChild(frag, child);
//    }
//  });
//}
//
//
// CSS
//.highlight {
//  background: lightpink;
//}
//
//
//
// Highlight all keywords found in the page
//highlight(document.body, ['lorem', 'amet', 'autem']);
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//// Using JavaScript to highlight a specific word by changing its background color
// var contentElement = document.getElementById("content");
// var contentText = contentElement.textContent;
//
// // Specify the word you want to highlight
// var targetWord = "text";
//
// // Wrap the target word in a span with a specific class
// var highlightedText = contentText.replace(new RegExp(targetWord, 'g'), '<span class="highlighted">' + targetWord + '</span>');
// //var highlightedText = contentText.replace(new RegExp(targetWord, 'g'), '<span class='blue'>My name</span>");
//
// // Set the updated HTML back to the element
// contentElement.innerHTML = highlightedText;
