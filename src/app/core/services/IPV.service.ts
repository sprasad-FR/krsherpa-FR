import { Injectable } from '@angular/core';
//import { environment } from '@env/environment';

import { User } from '../auth/credentials.service';

import { Observable } from 'rxjs';
import { HttpDispatcherService } from '../http/http-dispatcher.service';



@Injectable({ providedIn: 'root' })
export class IPVService {
  constructor(private httpDispatcher: HttpDispatcherService) {}

  

  CheckMail( ml:string) {

    var isvalid=false;


   // var mailformat = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";

      //  var mailformat = "^[A-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[A-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*$";
  
       
  
    if(ml.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
    //alert("Valid email address!");
  
    return true;
    }
    else
    {
   
    return false;
    }


    
    
  }
    
   
    



  CheckIP(id: string, ip:string) {

var isvalid=false;




let res={isValid:false,
msg:"xx"
}



if(isNaN(Number(ip))){

  res={isValid:false,
    msg:"Invalid"
    }
return res;
}
else{

  isvalid=true;

}

if (id  !=null && id  !="")
  {
    id=id.replace ('+','');

  var vv=  this.getIPV(id,ip); 
 



  if (isvalid)
  {
        
    if (vv.includes('-'))
    {

    }
    else if (vv.includes(','))
    {
      console.log('in comma',vv);
      isvalid=false;

      var str_array = vv.split(',');

      for(var i = 0; i < str_array.length; i++) {
         // Trim the excess whitespace.
         let ln= Number(str_array[i])

         console.log(ln);
    console.log(ip.length);

    if (ip.length==ln)
    {
      res={isValid:true,
        msg:""
        }
        isvalid=true;
    }
     
      }

      if (ip.length>12)
      {
        res={isValid:false,
          msg:"Invalid Length"
          }
          isvalid=false;
      }

      
    }
    else if (vv=='0')
    {
      

      if (ip.length>12)
      {
        res={isValid:false,
          msg:"Invalid Length"
          }
          isvalid=false;
      }
  


    }
    else
    {
      
    let ln= Number(vv)

  

    if (ip.length==ln)
    {
      res={isValid:true,
        msg:""
        }
        isvalid=true;
    }
    else{
      res={isValid:false,
        msg:"Invalid Length"
        }
        isvalid=false;
    }

    }

  }
  }
  
if (isvalid)
{

  if (this.allCharactersSame(ip))
  {
    isvalid=false;
    res={isValid:false,
      msg:"Invalid Number"
      }
  }

}


if (isvalid)
{
  res={isValid:true,
    msg:"Valid"
    }

}



    return res;


  }

   allCharactersSame(s:any)
  {
      let n = s.length;
      for (let i = 1; i < n; i++)
      {
          if (s[i] != s[0])
          {
              return false;
          }
      }
      return true;
  }



  getIPV(id: string, ip:string) {

    // console.log( id);
     if (id != null && id != "" && this.IPLst != undefined) {
       let user = this.IPLst?.find((x) => x.Code == id);
      //
   
      // const user = this.usersArray.filter((x) => x.userId === id);
       if (user) {
        console.log(user)
         return user.ln;
       } else {
       
         return '0';
       }
     } else {
       return '0';
     }
   }


   IPLst=[
    {
      "Country": "Afghanistan",
      "Code": "93",
      "ln": "9"
    },
    {
      "Country": "Åland",
      "Code": "358",
      "ln": "8,10,22"
    },
    {
      "Country": "Albania ",
      "Code": "355",
      "ln": "0"
    },
    {
      "Country": "Algeria",
      "Code": "213",
      "ln": "9"
    },
    {
      "Country": "American Samoa",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Andorra",
      "Code": "376",
      "ln": "0"
    },
    {
      "Country": "Angola",
      "Code": "244",
      "ln": "0"
    },
    {
      "Country": "Anguilla",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Antigua and Barbuda",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Argentina",
      "Code": "54",
      "ln": "10"
    },
    {
      "Country": "Armenia",
      "Code": "374",
      "ln": "8"
    },
    {
      "Country": "Aruba",
      "Code": "297",
      "ln": "7"
    },
    {
      "Country": "Ascension Island",
      "Code": "247",
      "ln": "0"
    },
    {
      "Country": "Australia",
      "Code": "61",
      "ln": "9"
    },
    {
      "Country": "Australian Antarctic Territory",
      "Code": "672",
      "ln": "9"
    },
    {
      "Country": "Austria",
      "Code": "43",
      "ln": "10,11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "Azerbaijan",
      "Code": "994",
      "ln": "9"
    },
    {
      "Country": "Bahamas",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Bahrain",
      "Code": "973",
      "ln": "8"
    },
    {
      "Country": "Bangladesh ",
      "Code": "880 ",
      "ln": "10"
    },
    {
      "Country": "Barbados",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Belarus",
      "Code": "375",
      "ln": "9"
    },
    {
      "Country": "Belgium",
      "Code": "32",
      "ln": "9"
    },
    {
      "Country": "Belize",
      "Code": "501",
      "ln": "7"
    },
    {
      "Country": "Benin",
      "Code": "229",
      "ln": "6,7,8,9"
    },
    {
      "Country": "Bermuda",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Bhutan",
      "Code": "975",
      "ln": "0"
    },
    {
      "Country": "Bolivia",
      "Code": "591",
      "ln": "0"
    },
    {
      "Country": "Bonaire",
      "Code": "599",
      "ln": "0"
    },
    {
      "Country": "Bosnia and Herzegovina (Bosnia-Herzegovina)",
      "Code": "387",
      "ln": "8,10"
    },
    {
      "Country": "Botswana",
      "Code": "267",
      "ln": "0"
    },
    {
      "Country": "Brazil",
      "Code": "55",
      "ln": "11"
    },
    {
      "Country": "British Indian Ocean Territory ",
      "Code": "246 ",
      "ln": "7"
    },
    {
      "Country": "British Virgin Islands",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Brunei",
      "Code": "673",
      "ln": "0"
    },
    {
      "Country": "Bulgaria",
      "Code": "359",
      "ln": "9,10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "Burkina Faso",
      "Code": "226",
      "ln": "8"
    },
    {
      "Country": "Burma",
      "Code": "95",
      "ln": "0"
    },
    {
      "Country": "Burundi",
      "Code": "257",
      "ln": "0"
    },
    {
      "Country": "Cambodia",
      "Code": "855",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "Cameroon",
      "Code": "237",
      "ln": "9"
    },
    {
      "Country": "Canada",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Cape Verde",
      "Code": "238",
      "ln": "0"
    },
    {
      "Country": "Cayman Islands",
      "Code": "1 345",
      "ln": "10"
    },
    {
      "Country": "Central African Republic",
      "Code": "236",
      "ln": "0"
    },
    {
      "Country": "Chad",
      "Code": "235",
      "ln": "8"
    },
    {
      "Country": "Chagos Islands",
      "Code": "246",
      "ln": "7"
    },
    {
      "Country": "Chile",
      "Code": "56",
      "ln": "9"
    },
    {
      "Country": "People's Republic of China",
      "Code": "86",
      "ln": "8,10,11,13"
    },  
    {
      "Country": "Christmas Island",
      "Code": "61",
      "ln": "0"
    },
    {
      "Country": "Cocos (Keeling) Islands",
      "Code": "61",
      "ln": "0"
    },
    {
      "Country": "Colombia",
      "Code": "57",
      "ln": "10"
    },
    {
      "Country": "Comoros",
      "Code": "269",
      "ln": "0"
    },
    {
      "Country": "Republic of Congo",
      "Code": "242",
      "ln": "0"
    },
    {
      "Country": "Democratic Republic of Congo",
      "Code": "243",
      "ln": "0"
    },
    {
      "Country": "Cook Islands",
      "Code": "682",
      "ln": "5"
    },
    {
      "Country": "Costa Rica",
      "Code": "506",
      "ln": "8"
    },
    {
      "Country": "Croatia",
      "Code": "385",
      "ln": "9"
    },
    {
      "Country": "Cuba",
      "Code": "53",
      "ln": "0"
    },
    {
      "Country": "Curaçao",
      "Code": "599",
      "ln": "0"
    },
    {
      "Country": "Cyprus",
      "Code": "357",
      "ln": "8"
    },
    {
      "Country": "Czech Republic",
      "Code": "420",
      "ln": "9"
    },
    {
      "Country": "Denmark",
      "Code": "45",
      "ln": "8"
    },
    {
      "Country": "Diego Garcia",
      "Code": "246",
      "ln": "7"
    },
    {
      "Country": "Djibouti",
      "Code": "253",
      "ln": "0"
    },
    {
      "Country": "Dominica",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Dominican Republic",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "East Timor",
      "Code": "670",
      "ln": "8"
    },
    {
      "Country": "Easter Island",
      "Code": "56",
      "ln": "0"
    },
    {
      "Country": "Ecuador",
      "Code": "593",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "Egypt",
      "Code": "20",
      "ln": "10"
    },
    {
      "Country": "El Salvador",
      "Code": "503",
      "ln": "8"
    },
    {
      "Country": "England",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Equatorial Guinea",
      "Code": "240",
      "ln": "0"
    },
    {
      "Country": "Eritrea",
      "Code": "291",
      "ln": "0"
    },
    {
      "Country": "Estonia ",
      "Code": "372 ",
      "ln": "7,8"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "7"
    },
    {
      "Country": "Ethiopia",
      "Code": "251",
      "ln": "0"
    },
    {
      "Country": "Eswatini",
      "Code": "268",
      "ln": "8"
    },
    {
      "Country": "Falkland Islands",
      "Code": "500",
      "ln": "5"
    },
    {
      "Country": "Faroe Islands",
      "Code": "298",
      "ln": "5"
    },
    {
      "Country": "Federated States of Micronesia",
      "Code": "691",
      "ln": "7"
    },
    {
      "Country": "Fiji",
      "Code": "679",
      "ln": "0"
    },
    {
      "Country": "Finland",
      "Code": "358",
      "ln": "5,6,7,8,9,10,11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "08/10/22"
    },
    {
      "Country": "France",
      "Code": "33",
      "ln": "9"
    },
    {
      "Country": "French Overseas Departments and Territories",
      "Code": "262",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "508",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "590",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "594",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "596",
      "ln": "0"
    },
    {
      "Country": "French Guiana",
      "Code": "594",
      "ln": "9,12"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12"
    },
    {
      "Country": "French Polynesia",
      "Code": "689",
      "ln": "6"
    },
    {
      "Country": "Gabon",
      "Code": "241",
      "ln": "7"
    },
    {
      "Country": "Gambia",
      "Code": "220",
      "ln": "0"
    },
    {
      "Country": "Georgia",
      "Code": "995",
      "ln": "9"
    },
    {
      "Country": "Germany",
      "Code": "49",
      "ln": "10,11,22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10/11/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "Ghana",
      "Code": "233",
      "ln": "9"
    },
    {
      "Country": "Gibraltar",
      "Code": "350",
      "ln": "0"
    },
    {
      "Country": "Greece",
      "Code": "30",
      "ln": "10"
    },
    {
      "Country": "Greenland",
      "Code": "299",
      "ln": "6"
    },
    {
      "Country": "Grenada",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Guadeloupe",
      "Code": "590",
      "ln": "9,12"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12?"
    },
    {
      "Country": "Guam",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Guatemala",
      "Code": "502",
      "ln": "8"
    },
    {
      "Country": "Guernsey",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Guinea",
      "Code": "224",
      "ln": "0"
    },
    {
      "Country": "Guinea-Bissau",
      "Code": "245",
      "ln": "0"
    },
    {
      "Country": "Guyana",
      "Code": "592",
      "ln": "0"
    },
    {
      "Country": "Haiti",
      "Code": "509",
      "ln": "0"
    },
    {
      "Country": "Hawaii",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Honduras",
      "Code": "504",
      "ln": "8"
    },
    {
      "Country": "Hong Kong",
      "Code": "852",
      "ln": "8"
    },
    {
      "Country": "Hungary",
      "Code": "36",
      "ln": "9"
    },
    {
      "Country": "Iceland",
      "Code": "354",
      "ln": "0"
    },
    {
      "Country": "India",
      "Code": "91",
      "ln": "10"
    },
    {
      "Country": "Indonesia",
      "Code": "62",
      "ln": "9,10,11,22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10/11/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "09/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10/11/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "11"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "Iran",
      "Code": "98",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Iraq",
      "Code": "964",
      "ln": "10"
    },
    {
      "Country": "Ireland",
      "Code": "353",
      "ln": "9"
    },
    {
      "Country": "Isle of Man",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Israel",
      "Code": "972",
      "ln": "9"
    },
    {
      "Country": "Italy",
      "Code": "39",
      "ln": "10,12,13"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12 (\"32\"  10-digit MSISDN)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "09/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "09/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12 (\"34\"  10-digit MSISDN)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "09/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12 (\"36\"  10-digit MSISDN)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "09/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12 (\"38\"  10-digit MSISDN)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "13 (3  10)"
    },
    {
      "Country": "Ivory Coast",
      "Code": "225",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Jamaica",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Jan Mayen",
      "Code": "47",
      "ln": "0"
    },
    {
      "Country": "Japan",
      "Code": "81 ",
      "ln": "10"
    },
    {
      "Country": "Jersey",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Jordan",
      "Code": "962",
      "ln": "9"
    },
    {
      "Country": "Kazakhstan",
      "Code": "7",
      "ln": "10"
    },
    {
      "Country": "Kenya",
      "Code": "254 ",
      "ln": "10"
    },
    {
      "Country": "Kiribati",
      "Code": "686",
      "ln": "8"
    },
    {
      "Country": "Kosovo",
      "Code": "383",
      "ln": "8"
    },
    {
      "Country": "Kuwait",
      "Code": "965",
      "ln": "8"
    },
    {
      "Country": "Kyrgyzstan",
      "Code": "996",
      "ln": "9"
    },
    {
      "Country": "Laos",
      "Code": "856",
      "ln": "0"
    },
    {
      "Country": "Latvia",
      "Code": "371",
      "ln": "8"
    },
    {
      "Country": "Lebanon",
      "Code": "961",
      "ln": "8"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "8"
    },
    {
      "Country": "Lesotho",
      "Code": "266",
      "ln": "0"
    },
    {
      "Country": "Liberia",
      "Code": "231",
      "ln": "7,8"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "8"
    },
    {
      "Country": "Libya",
      "Code": "218",
      "ln": "10"
    },
    {
      "Country": "Liechtenstein",
      "Code": "423",
      "ln": "0"
    },
    {
      "Country": "Lithuania",
      "Code": "370",
      "ln": "8"
    },
    {
      "Country": "Luxembourg",
      "Code": "352",
      "ln": "9"
    },
    {
      "Country": "Macau",
      "Code": "853",
      "ln": "0"
    },
    {
      "Country": "Madagascar",
      "Code": "261",
      "ln": "0"
    },
    {
      "Country": "Madeira",
      "Code": "351",
      "ln": "0"
    },
    {
      "Country": "Malawi",
      "Code": "265",
      "ln": "TNM"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "Celtel"
    },
    {
      "Country": "Malaysia",
      "Code": "60",
      "ln": "7,8,9"
    },
   
    {
      "Country": "",
      "Code": "",
      "ln": "7"
    },
    {
      "Country": "Maldives",
      "Code": "960",
      "ln": "7"
    },
    {
      "Country": "Mali",
      "Code": "223",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "8"
    },
    {
      "Country": "Malta",
      "Code": "356",
      "ln": "8"
    },
    {
      "Country": "Marshall Islands",
      "Code": "692",
      "ln": "7"
    },
    {
      "Country": "Martinique",
      "Code": "596",
      "ln": "9,12"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12?"
    },
    {
      "Country": "Mauritania",
      "Code": "222",
      "ln": "0"
    },
    {
      "Country": "Mauritius",
      "Code": "230",
      "ln": "8"
    },
    {
      "Country": "Mayotte",
      "Code": "262",
      "ln": "0"
    },
    {
      "Country": "Mexico",
      "Code": "52",
      "ln": "10"
    },
    {
      "Country": "Moldova",
      "Code": "373",
      "ln": "8"
    },
    {
      "Country": "Monaco",
      "Code": "377",
      "ln": "8"
    },
    {
      "Country": "Mongolia",
      "Code": "976",
      "ln": "8"
    },
    {
      "Country": "Montenegro",
      "Code": "382",
      "ln": "8"
    },
    {
      "Country": "Montserrat",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Morocco",
      "Code": "212",
      "ln": "0"
    },
    {
      "Country": "Mozambique",
      "Code": "258",
      "ln": "12"
    },
    {
      "Country": "Myanmar",
      "Code": "95",
      "ln": "8,9,10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "8"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "Artsakh",
      "Code": "374",
      "ln": "0"
    },
    {
      "Country": "Namibia",
      "Code": "264",
      "ln": "0"
    },
    {
      "Country": "Nauru",
      "Code": "674",
      "ln": "0"
    },
    {
      "Country": "Nepal",
      "Code": "977",
      "ln": "10"
    },
    {
      "Country": "Netherlands",
      "Code": "31",
      "ln": "8"
    },
    {
      "Country": "New Caledonia",
      "Code": "687",
      "ln": "6"
    },
    {
      "Country": "New Zealand",
      "Code": "64",
      "ln": "8,9,10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "08/10/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "08/09/22"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Nicaragua",
      "Code": "505",
      "ln": "8"
    },
    {
      "Country": "Niger",
      "Code": "227",
      "ln": "8"
    },
    {
      "Country": "Nigeria",
      "Code": "234",
      "ln": "8"
    },
    {
      "Country": "Niue",
      "Code": "683",
      "ln": "4"
    },
    {
      "Country": "Norfolk Island",
      "Code": "672",
      "ln": "6"
    },
    {
      "Country": "North Korea",
      "Code": "850",
      "ln": "0"
    },
    {
      "Country": "North Macedonia",
      "Code": "389",
      "ln": "8"
    },   
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Northern Ireland",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Northern Mariana Islands",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Norway",
      "Code": "47",
      "ln": "8"
    },
    {
      "Country": "Oman",
      "Code": "968",
      "ln": "8"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Pakistan",
      "Code": "92",
      "ln": "10"
    },
    {
      "Country": "Palau",
      "Code": "680",
      "ln": "7"
    },
    {
      "Country": "Palestine, State of",
      "Code": "970",
      "ln": "9"
    },
    {
      "Country": "Palestine, State of",
      "Code": "972",
      "ln": "9"
    },
    {
      "Country": "Panama",
      "Code": "507",
      "ln": "8"
    },
    {
      "Country": "Papua New Guinea",
      "Code": "675",
      "ln": "8"
    },
    {
      "Country": "Paraguay ",
      "Code": "595 ",
      "ln": "9"
    },
    {
      "Country": "Peru",
      "Code": "51",
      "ln": "9"
    },
    {
      "Country": "Philippines",
      "Code": "63",
      "ln": "10"
    },
    {
      "Country": "Pitcairn Islands",
      "Code": "64",
      "ln": "0"
    },
    {
      "Country": "Poland",
      "Code": "48",
      "ln": "9"
    },
    {
      "Country": "Portugal",
      "Code": "351",
      "ln": "9"
    },
    {
      "Country": "Puerto Rico",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Qatar",
      "Code": "974",
      "ln": "8"
    },
    {
      "Country": "Réunion",
      "Code": "262",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "12?"
    },
    {
      "Country": "Romania",
      "Code": "40",
      "ln": "10"
    },
    {
      "Country": "Russia (Russian Federation)",
      "Code": "7",
      "ln": "10"
    },
    {
      "Country": "Rwanda",
      "Code": "250",
      "ln": "0"
    },
    {
      "Country": "Saba",
      "Code": "599",
      "ln": "0"
    },
    {
      "Country": "Sahrawi Arab Democratic Republic",
      "Code": "212",
      "ln": "0"
    },
    {
      "Country": "Saint Barthélemy",
      "Code": "590",
      "ln": "0"
    },
    {
      "Country": "Saint Helena and Tristan da Cunha (not Ascenscion)",
      "Code": "290",
      "ln": "4"
    },
    {
      "Country": "Saint Kitts and Nevis",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Saint Lucia",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Collectivity of Saint Martin",
      "Code": "590",
      "ln": "0"
    },
    {
      "Country": "Saint Pierre and Miquelon",
      "Code": "508",
      "ln": "0"
    },
    {
      "Country": "Saint Vincent and the Grenadines",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Samoa",
      "Code": "685",
      "ln": "5"
    },
    {
      "Country": "San Marino",
      "Code": "378",
      "ln": "0"
    },
    {
      "Country": "São Tomé and Príncipe",
      "Code": "239",
      "ln": "0"
    },
    {
      "Country": "Saudi Arabia",
      "Code": "966",
      "ln": "9"
    },
    {
      "Country": "Scotland",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Senegal",
      "Code": "221",
      "ln": "0"
    },
    {
      "Country": "Serbia",
      "Code": "381",
      "ln": "8,9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "8"
    },
    {
      "Country": "Seychelles",
      "Code": "248",
      "ln": "0"
    },
    {
      "Country": "Sierra Leone",
      "Code": "232",
      "ln": "0"
    },
    {
      "Country": "Singapore",
      "Code": "65",
      "ln": "8"
    },
    {
      "Country": "Sint Eustatius",
      "Code": "599",
      "ln": "0"
    },
    {
      "Country": "Sint Maarten",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Slovakia (Slovak Republic)",
      "Code": "421",
      "ln": "9"
    },
    {
      "Country": "Slovenia",
      "Code": "386",
      "ln": "0"
    },
    {
      "Country": "Solomon Islands ",
      "Code": "677 ",
      "ln": "7"
    },
    {
      "Country": "Somalia",
      "Code": "252",
      "ln": "7,8"
    },
    {
      "Country": "South Africa",
      "Code": "27",
      "ln": "9"
    },
    {
      "Country": "South Georgia and the South Sandwich Islands",
      "Code": "500",
      "ln": "0"
    },
    {
      "Country": "South Korea",
      "Code": "82",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9,10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "9,10"
    },
    {
      "Country": "South Ossetia",
      "Code": "995",
      "ln": "0"
    },
    {
      "Country": "South Sudan",
      "Code": "211",
      "ln": "0"
    },
    {
      "Country": "Spain",
      "Code": "34",
      "ln": "9"
    },
    {
      "Country": "Sri Lanka",
      "Code": "94",
      "ln": "7"
    },
    {
      "Country": "Sudan",
      "Code": "249",
      "ln": "0"
    },
    {
      "Country": "Suriname",
      "Code": "597",
      "ln": "0"
    },
    {
      "Country": "Svalbard",
      "Code": "47",
      "ln": "0"
    },
    {
      "Country": "Sweden",
      "Code": "46",
      "ln": "7,8,9,10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "10"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "7"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Switzerland",
      "Code": "41",
      "ln": "9"
    },
    {
      "Country": "Syria",
      "Code": "963",
      "ln": "9"
    },
    {
      "Country": "Taiwan",
      "Code": "886",
      "ln": "9"
    },
    {
      "Country": "Tajikistan",
      "Code": "992",
      "ln": "0"
    },
    {
      "Country": "Tanzania",
      "Code": "255",
      "ln": "6"
    },
    {
      "Country": "Thailand",
      "Code": "66",
      "ln": "9"
    },
    {
      "Country": "Togo",
      "Code": "228",
      "ln": "8"
    },
    {
      "Country": "Tokelau",
      "Code": "690",
      "ln": "0"
    },
    {
      "Country": "Tonga",
      "Code": "676",
      "ln": "0"
    },
    {
      "Country": "Trinidad and Tobago",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Tristan da Cunha",
      "Code": "290",
      "ln": "0"
    },
    {
      "Country": "Tunisia",
      "Code": "216",
      "ln": "8"
    },
    {
      "Country": "Turkey",
      "Code": "90",
      "ln": "10"
    },
    {
      "Country": "Turkmenistan",
      "Code": "993",
      "ln": "0"
    },
    {
      "Country": "Turks and Caicos Islands",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Tuvalu",
      "Code": "688",
      "ln": "0"
    },
    {
      "Country": "Uganda",
      "Code": "256",
      "ln": "0"
    },
    {
      "Country": "Ukraine ",
      "Code": "380 ",
      "ln": "9"
    },
    {
      "Country": "United Arab Emirates",
      "Code": "971",
      "ln": "9"
    },
    {
      "Country": "United Kingdom",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "United States",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "United States Virgin Islands",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Uruguay",
      "Code": "598",
      "ln": "8"
    },
    {
      "Country": "Uzbekistan",
      "Code": "998",
      "ln": "0"
    },
    {
      "Country": "Vanuatu",
      "Code": "678",
      "ln": "0"
    },
    {
      "Country": "Vatican City",
      "Code": "39",
      "ln": "10"
    },
    {
      "Country": "Venezuela",
      "Code": "58",
      "ln": "7"
    },
    {
      "Country": "Vietnam",
      "Code": "84",
      "ln": "9"
    },
    {
      "Country": "U.S. Virgin Islands",
      "Code": "1",
      "ln": "10"
    },
    {
      "Country": "Wales",
      "Code": "44",
      "ln": "10"
    },
    {
      "Country": "Wallis and Futuna",
      "Code": "681",
      "ln": "0"
    },
    {
      "Country": "Western Sahara",
      "Code": "212",
      "ln": "0"
    },
    {
      "Country": "",
      "Code": "",
      "ln": "0"
    },
    {
      "Country": "Yemen",
      "Code": "967",
      "ln": "9"
    },
    {
      "Country": "Zambia",
      "Code": "260",
      "ln": "9"
    },
    {
      "Country": "Zimbabwe",
      "Code": "263",
      "ln": "9"
    }
   ]


}
