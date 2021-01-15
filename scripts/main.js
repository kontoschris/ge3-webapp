"use strict";

//*** Database get Data code *******************************************/
function getRoutesCoordinates(database, routeKey, pointType, coordinateType) {
  var retVal;
  var currentVal;
  var extraData;
  var leadsRef = database.ref("Routes");
  leadsRef.once("value").then(function (snapshot) {
    var key = snapshot.key; // "ada"
    var fbKey;
    snapshot.forEach(function (data) {
      var val = data;
      fbKey = data.key;
      console.log("fbkey = " + fbKey);
      console.log("routeKey = " + routeKey);
      console.log(data.val());
      var extraData = data.child(pointType + "/" + coordinateType).val(); // "last"
      //console.log(extraData);
      if (fbKey == routeKey) {
        console.log("found + " + extraData);

        return extraData;
      }
    });
  });
  return retVal;
}

function loadRoutesCoordinates(database) {
  var retVal;
  var routeIndex = 0;
  var RouteData = new Array(2);
  var arrRouteData = [[], []]; // empty, staggered 2-dimensional array...
  var leadsRef = database.ref("Routes");
  leadsRef.once("value").then(function (snapshot) {
    var key = snapshot.key; // "ada"
    var fbKey;
    snapshot.forEach(function (data) {
      var val = data;
      fbKey = data.key;

      arrRouteData[routeIndex][0] = fbKey;
      arrRouteData[routeIndex][1] = data
        .child("endPoint" + "/" + "latitude")
        .val();
      arrRouteData[routeIndex][2] = data
        .child("endPoint" + "/" + "longitude")
        .val();
      arrRouteData[routeIndex][3] = data
        .child("startingPoint" + "/" + "latitude")
        .val();
      arrRouteData[routeIndex][4] = data
        .child("startingPoint" + "/" + "longitude")
        .val();
      routeIndex++;
    });
  });

  return arrRouteData;
}

function getRoutesCoordinatesArray(routeKey, pointType, coordinateType) {
  var retVal;
  var keyOfrouteRow;

  ArrayOfRoutes.forEach((routeRow) => {
    keyOfrouteRow = routeRow[0];

    if (routeKey == keyOfrouteRow) {
      if (pointType == "endPoint") {
        if (coordinateType == "latitude") {
          retVal = routeRow[1];
        }
        if (coordinateType == "longitude") {
          retVal = routeRow[2];
        }
      }
      if (pointType == "startingPoint") {
        if (coordinateType == "latitude") {
          retVal = routeRow[3];
        }
        if (coordinateType == "longitude") {
          retVal = routeRow[4];
        }
      }
    }
  });

  return retVal;
}

function loadRequestData(database) {
  var retVal;
  var rowIndex = 0;
  var arrRequests = []; // empty, staggered 2-dimensional array...
  var requestsRef = database.ref("Requests");

  requestsRef.once("value").then(function (requestsSnapshot) {
    var requestKey = requestsSnapshot.key; // "ada"

    requestsSnapshot.forEach(function (requestsSnapshotData) {
      var userRef = database.ref("Requests" + "/" + requestsSnapshotData.key);
      userRef.once("value").then(function (userRefSnapshot) {
        userRefSnapshot.forEach(function (userRefSnapshotData) {
          var dateRequest = userRefSnapshotData.child("date").val();
          var row = [];
          //console.log(rowIndex + "-" + dateRequest);
          row[0] = rowIndex;
          //console.log(row[1]);
          row[2] = userRefSnapshotData.child("userEmail").val();
          row[3] = userRefSnapshotData.child("guide/name").val();
          row[4] = userRefSnapshotData.child("transport/name").val();
          row[5] = userRefSnapshotData.child("route/name").val();
          row[6] = userRefSnapshotData.child("route/endPoint/latitude").val();
          row[7] = userRefSnapshotData.child("route/endPoint/longitude").val();
          row[8] = userRefSnapshotData
            .child("route/startingPoint/latitude")
            .val();
          row[9] = userRefSnapshotData
            .child("route/startingPoint/longitude")
            .val();
          //console.log(row[0] + "/" + row[9]);
          arrRequests[rowIndex] = row;
          rowIndex++;
        });
        //console.log(routeIndex);
      });
    });
  });
  //  console.log(arrRequests);

  return arrRequests;
}

function getRequestArray(routeKey, pointType, coordinateType) {
  console.log(ArrayOfRequests);
}

//*** MARKERS CODE ***********************************************/
function addMarker(la, lo) {
  $$("mapid").add({ lat: la, lng: lo, title: "Munich" });
}

function hideMarker() {
  var item = $$("mapid").getItem(1);
  if (!item) return;

  item.hidden = !item.hidden;
  $$("mapid").updateItem(1, item);
}

function animateMarker() {
  var item = $$("mapid").getItem(1);
  if (!item) return;

  var marker = item.$marker;
  if (marker.getAnimation()) marker.setAnimation(null);
  else marker.setAnimation(google.maps.Animation.BOUNCE);
}

function clearMap() {
  $$("mapid").clearAll();
}
function AddRoute(parentId) {
  //var parentId = cell.row;

  var endPointLa, endPointLo;
  var startPointLa, startPointLo;
  endPointLa = getRoutesCoordinatesArray(parentId, "endPoint", "latitude");
  endPointLo = getRoutesCoordinatesArray(parentId, "endPoint", "longitude");

  startPointLa = getRoutesCoordinatesArray(
    parentId,
    "startingPoint",
    "latitude"
  );
  startPointLo = getRoutesCoordinatesArray(
    parentId,
    "startingPoint",
    "longitude"
  );

  console.log(startPointLo);
  addMarker(endPointLa, endPointLo);
  addMarker(startPointLa, startPointLo);

  return false;
}
