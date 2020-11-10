var pageObject

var loadintoWantedQueries = (browser) => {
    browser
        .click('@homeButton')
        .click('@enterwantedButton')
}

var editallFields = (browser, headerinput, mkeinput, oaiinput, nameinput, sexinput, raceinput, heightinput, weightinput, hairinput, offenseinput, dowinput, dlinput, dlstateinput, dlexpirationinput, licenseplateinput, licensestateinput, licenseexpirationinput) => {
    browser
        .setValue('@headerField', headerinput)
        .setValue('@mkeField', mkeinput)
        .setValue('@oaiField', oaiinput)
        .setValue('@nameField', nameinput)
        //.setValue('@sexField', sexinput)
        .click('select[name="sexInput"] option[value="M"]')
        //.setValue('@raceField', raceinput)
        .click('select[name="racInput"] option[value="W"]')
        .setValue('@heightField', heightinput)
        .setValue('@weightField', weightinput)
        .setValue('@hairField', hairinput)
        .setValue('@offenseField', offenseinput)
        .setValue('@dateofwarrantField', dowinput)
        .setValue('@driverslicenseField', dlinput)
        .setValue('@dlstateField', dlstateinput)
        .setValue('@dlexpirationField', dlexpirationinput)
        .setValue('@licenseplateField', licenseplateinput)
        .setValue('@licensestateField', licensestateinput)
        .setValue('@licenseexpirationField', licenseexpirationinput)
        .pause(2000)
}

module.exports = {
    beforeEach: browser => {
        pageObject = browser.page.obkenterWanted()
        pageObject
            .navigate()
            .maximizeWindow()

    },
    after: browser => {
        pageObject
        .end()
    },
   'Testing Lower Boundaries of all Fields' : browser => {
       pageObject
       //loadintoWantedQueries(pageObject)
       editallFields(pageObject, "AAAAAAAAA","MK", "111111111", "CON", "Male", "White", "511", "1" ,"blu", "arson", "01011900", "1", "NJ", "01011900", "1234A", "NY", "01011900")
       pageObject
       .click("@ewsubmitButton")
       .expect.element('@ewresultsField').text.to.equal("AAAAAAAAA.MK.111111111.CON.M.W.511.001.blu.arson.1900-01-01.1.NJ.1900-01-01.1234A.NY.1900-01-01")
       
   },
   'Testing Upper Boundaries of all Fields' : browser => {
    pageObject
    //loadintoWantedQueries(pageObject)
    editallFields(pageObject, "AAAAAAAAAAAAAAAAAAA","MKEE", "111111111", "123456789A123456789B123456789C", "Male", "White", "999", "999" ,"ABCDEFGHIJ", "123456789A12345", "11102020", "123456789A123456789B", "CA", "12129999", "1234ABCD", "NY", "12129999")
    pageObject
    .click("@ewsubmitButton")
    .expect.element('@ewresultsField').text.to.equal("AAAAAAAAAAAAAAAAAAA.MKEE.111111111.123456789A123456789B123456789C.M.W.999.999.ABCDEFGHIJ.123456789A12345.2020-11-10.123456789A123456789B.CA.9999-12-12.1234ABCD.NY.9999-12-12")
   },


   'Testing Error Messages' : browser => {
        pageObject
        //loadintoWantedQueries(pageObject)
        editallFields(pageObject, "AAAAAAAAAAAAAAAAAAAA","MKEE2", "111111111!", "123456789A123456789B123456789C!", "Male", "White", "9999", "9999" ,"ABCDEFGHIJ!1", "123456789A12345!", "11101899", "123456789A123456789B!", "CAT", "12121899", "1234ABCD!", "NYC", "12121899")
        pageObject
        .click("@ewsubmitButton")
        pageObject
        .verify.containsText('@ewerrorField', 'The "Header" field should be between 9 and 19 characters long.')
        .verify.containsText('@ewerrorField', 'The "MKE" field should be between 2 and 4 characters long.')
        .verify.containsText('@ewerrorField', 'The "Originating Agency Identifier" field should be 9 characters long.')
        .verify.containsText('@ewerrorField', 'The "Name" field should be between 3 and 30 characters long.')
        .verify.containsText('@ewerrorField', 'The "Height" field should be 3 characters long.')
        .verify.containsText('@ewerrorField', 'The "Weight" field should be between 1 and 3 characters long.')
        .verify.containsText('@ewerrorField', 'The "Hair" field should be between 3 and 10 characters long.')
        .verify.containsText('@ewerrorField', 'The "Offense" field should be between 5 and 15 characters long.')
        .verify.containsText('@ewerrorField', 'The "Date of Warrant/Violation" field must be entered as a date, MM/DD/YYYY, no earlier than 01/01/1900 and no later than')
        .verify.containsText('@ewerrorField', 'The "Drivers License" field should be between 1 and 20 characters long.')
        .verify.containsText('@ewerrorField', 'The "DL State" field should be 2 characters long.')
        .verify.containsText('@ewerrorField', 'The "DL Expiration Date" field can only include numeric characters.')
        .verify.containsText('@ewerrorField', 'The "License Plate" field should be between 5 and 8 characters long.')
        .verify.containsText('@ewerrorField', 'The "License State" field should be 2 characters long.')
        .verify.containsText('@ewerrorField', 'The "License Expiration Date" field can only include numeric characters.')
    }  
   
}