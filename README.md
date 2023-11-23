This time back in 2010 I noticed with all the extensions being released that gentrified the regular internet I still found myself unwittingly exposed to American grammar and spelling.

You know what I mean: “Color” instead of “Colour”.

Well this small Safari extension will substitute many of those common words:

| US              | UK                   |
| ----------------|----------------------|
| "Apartment"     | "Flat"
| "Attorney"      | "Barrister"
| "Awesome"       | "Brilliant"
| "Candy"         | "Sweets"
| "Cell Phone"    | "Mobile"
| "Center"        | "Centre"
| "Chemist"       | "Pharmacy"       
| "Cinema"        | "Movie Theater"
| "Color"         | "Colour"
| "Cookie"        | "Biscuit"        
| "Cotton Candy"  | "Candyfloss"
| "Defense"       | "Defence"
| "Diaper"        | "Nappy"
| "Dumpster"      | "Skip"
| "Elevator"      | "Lift"           
| "Favorite"      | "Favourite"
| "Flashlight"    | "Torch"
| "Flatmate"      | "Roommate"
| "Fries"         | "Chips"
| "Garbage"       | "Dustbin"
| "Garbage can"   | "Bin"            
| "Gasoline"      | "Petrol"
| "Guy"           | "Chap"           
| "Hire"          | "Rent"
| "Jello"         | "Jelly"
| "Jewelry"       | "Jewellery"
| "Lawyer"        | "Solicitor"
| "Liter"         | "Litre"
| "Mail"          | "Post"
| "Movie Theater" | "Cinema"
| "Neighbor"      | "Neighbour"
| "Parking lot"   | "Car park"
| "Plow"          | "Plough"
| "Potato Chips"  | "Crisps"
| "Sidewalk"      | "Pavement"
| "Sneakers"      | "Trainers"
| "Soccer"        | "Football"
| "Subway"        | "Tube"           
| "Sweater"       | "Jumper"
| "Theater"       | "Theatre"
| "Tic Tac Toe"   | "Noughts & crosses"
| "Tic-Tac-Toe"   | "Noughts & crosses"
| "Traffic Circle"| "Roundabout"
| "Truck"         | "Lorry"
| "Vacation"      | "Holiday"
| "Windshield"    | "Windscreen"


Of course, it's not complete, but these are some of the most common words that many websites use.

The toolbar icon will display all of the words that were substituted:

![greatEnglishPopup](https://github.com/kwolk/Great-English/assets/114968/6d063a0c-d32b-41a0-acff-903a6b13748b)


**ISSUES**
 
- **POP-UP TEXT** : Testing the extension on Wikipedia I found that it will not work with pop-up bubble text, only the website text contained within the HTML header tags.

- **LOGIC** : Relying on simple word substitution logic oddities such a "Cookie Policy" becomes "Biscuit Policy". But I can live with that. However, something more complex may need to be implemented with words like "Subway", which is a brand name and not just a mode of transport.

- **LOGIC** : Another issue is the frequency of a word used, as "Line" can be used in place of the word "queue", but the word line is perfectly valid in many other circumstances, of which the current logic takes no account of.

- **PLURAL WORDS** : Given that the logic will only look for whole word matches (regex : \\b gi) the plural of a word will slip through the filter.

- **WEIGHTS/MEASURES/CURRENCY** : I am also keen on converting time (everything to GMT), measurements (Metric to Imperial) and currency (US Dollar into British Pound Sterling).

- **SLANG** : For fear of falling down a rabbit hole, I only touched on the idea of _slang_ e.g. "Haz" rather than "Have". However, a feature like this would be impossible to keep on top of, unlike measurements.

- **CODE** : The world of code is dominated by American spelling and the last thing a programmer needs when scraping a block of logic from the internet is for the syntax to be modified e.g. ".color = .red", so I will need to scan Javascript for coding examples to be omitted from any substitutions.
