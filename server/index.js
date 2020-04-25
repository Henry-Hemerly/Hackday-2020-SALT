const express = require('express');
const app = express();
const keccak512 = require('js-sha3').keccak512;
const fetch = require('node-fetch');

let searchTerm;
const names = ['facebook', 'tinder', 'gmail', 'google', 'hotmail', 'instasgram', 'insta', 'face', 'name', 'yahoo'];


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
    res.end();
});

function report(fetchedDataObj) { 
    let passCount ='';
    let passLength = '';
    let commonNames = '';
    let report;
    if (fetchedDataObj.SearchPassAnon) {
        if (fetchedDataObj.SearchPassAnon.count > 0) {
            passCount = '<p>Up to this day, this password has been breached ' + fetchedDataObj.SearchPassAnon.count + ' times!</p>';
        }
        if (parseInt(fetchedDataObj.SearchPassAnon.char.substring(fetchedDataObj.SearchPassAnon.char.length -1)) < 12) {
            passLength = '<p>It looks like your password is not very long... cyber security experts agree length is THE most effective password safety.</p>';
        }
        names.forEach((name) => {
            let regex = new RegExp(name);   
            if (regex.test(searchTerm)) {
                console.log('ITs IN!');
                
                commonNames = '<p>It looks like your password contains one or more common names. Try to make it harder to guess. Reversing those names is a good start...</p>'
            }
        });
        report = passCount + '' + passLength + '' + commonNames;
    } else {
        report = 'That password seems to be alright!';
    }
    
    return report;
}

app.get('/:searchTerm', async (req, res) => { 
    searchTerm = req.params.searchTerm;
    const encryptedTerm = keccak512(req.params.searchTerm);
    let apiRes = await fetch('https://passwords.xposedornot.com/api/v1/pass/anon/' + encryptedTerm.substring(0,10));
    const resolvedPromise = await Promise.resolve(apiRes);
    const fml = await resolvedPromise
    .json(); 
    const finalSend = report(fml);
    res.send(finalSend);
});



