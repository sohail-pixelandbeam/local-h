const { urls } = require("../utils/Api_urls");
import { doConsole, retrieveItem } from "./../utils/functions"

async function doPost(body_data, url_plus) {

  doConsole(" I request @ " + urls.API + url_plus);
  doConsole(body_data);
  var { isError, data } = await fetch(urls.API + url_plus, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body_data),
  })
    .then((response) => response.json())
    // .then((response) => response.text())
    .then((responseJson) => {
      console.log(responseJson)
      return { isError: false, data: responseJson }
    }).catch((error) => {
      console.log('error is')
      console.log(error)
      return { isError: true, data: {} }
    });
  return { isError, data };
}

async function getUserToken() {
  let token = await retrieveItem('login_data');
  return token?.token;

}

export async function apiRequest(body_data, url_plus, method = "POST") {


  if (!body_data) body_data = { token: await getUserToken() }
  else body_data["token"] = await getUserToken()
  // let last_request = new Date();
  // last_request = last_request.getFullYear() + "-" + (last_request.getMonth() + 1) + "-" + last_request.getDate() + " " + last_request.getHours() + ":" + last_request.getMinutes()
  var url;
  url = urls.API + url_plus
  // + "&&" + last_request;
  if (method == 'GET' && body_data.token) url += '?' + Object.keys(body_data).map((k) => (k + '=' + encodeURIComponent(body_data[k]))).join('&');

  console.log(" I request @ " + url);
  console.log(body_data);
  const configs = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: method == 'GET' ? null : JSON.stringify(body_data),
  }

  // console.log('configs')
  // console.log(configs)
  // console.log(url + url_plus)

  return (
    fetch(url, configs)
      .then((response) => response.json())
      // .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson)
        return responseJson
      }).catch((error) => {
        console.log(error)
        return error
      })
  )


  // return {isError,data};
}


// async function doPostDoc(response, url_plus, token = "", path) {



//   console.log("gallery response");
//   console.log(response);


//   // var response = this.state.selected_modal_image[0];
//   var my_ext = response.uri.split('.');

//   var _ext = my_ext[my_ext.length - 1];


//   var real_name = response.uri.split('/');
//   var _real_name = real_name[real_name.length - 1];



//   const formData = new FormData();

//   formData.append("photo", {
//     name: _real_name,
//     type: Platform.OS === "android" ? "image/jpeg" : response.type,
//     uri: Platform.OS === "android" ? response.uri : response?.uri?.replace("file://", "")
//   });
//   formData.append("token", token);
//   formData.append("path", path);

//   console.log("this is wat I'm submitting");
//   console.log(formData);
//   const config = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//     body: formData
//   };




//   console.log(" I request @ " + urls.API + url_plus);
//   console.log(config);
//   var { isError, data } = await fetch(urls.API + url_plus, config).then((response) => response.json())
//     .then((responseJson) => {
//       console.log("Data did come")
//       console.log(responseJson)
//       return { isError: false, data: responseJson }
//     }).catch((error) => {
//       return { isError: true, data: {} }
//     });
//   return { isError, data };
// }

module.exports.doPost = doPost;
// module.exports.doPostDoc = doPostDoc;