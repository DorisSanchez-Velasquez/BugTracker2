//IMPORTED DATABASE, ERROR HANDLING, USER MODELS, AND DATABASE COMMANDS FROM COMMON.JS
const db = require("../db")
const {NotFoundError, BadRequestError} = require("../utils/errors")
const Teams = require("./teams")
const Users = require("./user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")
const { validUserAccess } = require("./ticket")



//DATABASE COMMANDS - Assures that everytime an action occurs with the database which in this case is a user insertion,
//Rollback all actions perfomed with the datbase once testing ends
//Ensures that test can be used repeatedly without the ned to keep error checking working models
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)






//Information to create a new team
const newTeam = {
    name : "Development Team",
    members : ["random@gmail.com", "user@gmail.com"],
    projects: [1]
}


//Information to create a new test user
const newUser = {
    email: "test@gmail.io",
    fullName: "Another Test User"
}






//TEST ALL THE TEAMS MODELS FOR CREATING A TEAMS, LIST ALL TEAMS, FETCH TEAM BY ID, AND ADDING NEW MEMBER TO TEAM
describe("Test Teams Models", () => {

    //TEST THE CREATE TEAM MODEL FOR BAD REQUEST ERRORS WHEN MISSING FIELDS AND PROPER CREATE TEAM INFORMATION
    describe("Test Team Creation", () => {



        //Test that a user can create a new team by providing the proper information as an authenticated user
        test("User can create a team with the proper information", async () => {
            //Register a new test user into the database with proper credentials
            const registerUser = await Users.register({...newUser, password: "pw"})
            //Create a new team by providing the test user information and new team object information
            const createTeam = await Teams.createTeam({user: registerUser, teamInfo: newTeam})

            //The createTeam function should return a response containing the id, name, id of members, creator id of test user, and projects id
            expect(createTeam).toEqual({
                "id": expect.any(Number),
		        "name": "Development Team",
		        "members": [1,2],
		        "creator_id": expect.any(Number),
		        "projects": [1]
            })
        })




        //Test that a user gets a BadRequestError if missing any required field from their request
        test("Creating a team with missing fields with throw a BadRequestError", async () => {
            //Make sure that there is only one assertion being received when the function executes
            expect.assertions(1)
            
            //Register the test user into the database and then attempt to create a new team with the test user info and an object with missing projects field
            //Should catch a BadRequestError because the projects field is missing from the request
            try
            {
                const registerUser = await Users.register({...newUser, password: "pw"})
                const createTeam = await Teams.createTeam({user: registerUser, teamInfo: {name: newTeam.name, members: newTeam.members}})
            }
            catch(error)
            {
                expect(error instanceof BadRequestError).toBeTruthy()
            }
        })
    })
})