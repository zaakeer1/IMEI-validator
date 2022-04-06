const express = require("express");
const { send } = require("process");
const app = express();

app.get('/checkIMEI/:IMEI', async (req,res) => {
    
    function sumDigit(n)
    {
        let sumOfDigits = 0;
        while (n > 0)
        {
            sumOfDigits = sumOfDigits + n % 10;
            n = parseInt(n / 10, 10);
        }
        return sumOfDigits;
    }
 
    function checkIMEI(s)
    {
 
        let l = s.length;           //Getting the length of the IMEI no
        
 
        if (l != 15)
            return false;             //All valid IMEI nos must be of 15 digits
        
        let n = parseInt(s);          //Converting string to number for calculations
        let totalSum = 0;

        for(let i = l; i >= 1; i--)
        {
            let digit = (n % 10);      //Getting the rightmost digit
 
          
            if (i % 2 == 0)            //Condition to check for every alternate digit
                digit = 2 * digit;     //Doubling every alternate digit
 
          
            totalSum += sumDigit(digit); //Calculating the total sum
            n = parseInt(n / 10, 10);  //Removing the rightmost digit
        }
 
        return (totalSum % 10 == 0);
    }
 
 
    
    let givenNo = req.params.IMEI; //Getting the IMEI number from the API 

    if (checkIMEI(givenNo))
        res.send("The given IMEI number is valid");
    else
        res.send("The given IMEI number is invalid");
})

app.listen(3000, () => console.log("Server running on port:3000"));