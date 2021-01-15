"use strict";

// *************************************************************
// ** LEFT TAB (3 tabs) and Map
var mainLeftTab = {
  container: "mainLeftTab",
  type: "space",
  height: 800,
  width: 610,
  view: "tabview",
  cells: [
    {
      header: "List of Guides",
      body: {
        type: "clean",
        rows: [
          {
            id: "dtableGuides",
            view: "datatable",
            height: 300,
            editable: true,
            editaction: "dblclick",
            columns: [
              {
                id: "name",
                header: "Full name of guide",
                editor: "text",
                fillspace: 1,
              },
              {
                id: "spokenLanguages",
                header: "Spoken Languages",
                editor: "text",
                fillspace: 1,
              },
            ],
            select: "row",
            // load data from Guides
            url: "firebase->Guides_new",
            // save data to Guides
            save: "firebase->Guides_new",
          },
          {
            view: "label",
            css: "label-info-box",
            label:
              "<b>Info: </b><u>Double click on field for edit. Values saved automatic!</u>",
          },
        ],
      },
    },
    {
      header: "List of Vehicles",
      body: {
        type: "clean",
        rows: [
          {
            id: "dtableVehicles",
            view: "datatable",
            editable: true,
            height: 300,
            editaction: "dblclick",
            columns: [
              {
                id: "name",
                header: "Car model and brand",
                editor: "text",
                fillspace: 1,
              },
              {
                id: "capacity",
                header: "Capacity",
                editor: "text",
                fillspace: 1,
              },
            ],
            select: "row",
            // load data from Transport
            url: "firebase->Transport",
            // save data to Transport
            save: "firebase->Transport",
          },

          {
            view: "label",
            css: "label-info-box",
            label:
              "<b>Info: </b><u>Double click on field for edit. Values saved automatic!</u>",
          },
        ],
      },
    },
    {
      header: "Route Management",
      body: {
        type: "clean",
        rows: [
          {
            id: "dtableRoutes",
            view: "datatable",
            editable: false,
            editaction: "dblclick",
            columns: [
              {
                id: "name",
                header: "Name or route",
                editor: "text",
                fillspace: 1,
                width: 150,
              },
              {
                id: "numPlaces",
                header: "Total places",
                editor: "text",
                fillspace: 1,
                width: 20,
              },
              // {
              //   template:
              //     "<input class='grid_button_show' type='button' value='Show on Map'>",
              //   width: 20,
              //   fillspace: 1,
              // },
            ],
            select: "row",
            on: {
              onItemClick: function (id, e, trg, cell) {
                clearMap();
                AddRoute(id.row);
              },
            },

            // load data from Routes
            url: "firebase->Routes",
            // save data to Routes
            save: "firebase->Routes",
          },
          {
            view: "label",
            css: "label-form-details",
            label: "Map of Current Route",
          },
          {
            view: "toolbar",
            elementsConfig: {
              autowidth: true,
            },
            elements: [
              {
                view: "button",
                value: "Add marker",
                click: function () {
                  webix.message("Not completed in this version");
                },
              },
              {
                view: "button",
                value: "Clear All",
                click: function () {
                  webix.message("Not completed in this version");
                },
              },
              {
                view: "button",
                value: "Hide/show",
                click: function () {
                  webix.message("Not completed in this version");
                },
              },
            ],
          },
          {
            key: "AIzaSyCCRW0-JRt0BXsCvPQd_fJ77OxW6kREqrw",
            view: "google-map",
            id: "mapid",
            zoom: 9,
            //center: [37.98381, 23.727539],
            center: [38.036329, 23.745516],
          },
        ],
      },
    },
  ],
};

var labelActiveRoutes = {
  container: "labelActiveRoutes",
  css: "label-active-routes",
  //paddingX: 17,
  height: 40,
  maxWidth: 1000,
  view: "toolbar",
  type: "space",
  elements: [{ view: "label", label: "Active Routes" }],
};

var toolbarActiveRoutes = {
  container: "toolbarActiveRoutes",
  paddingX: 30,
  paddingy: 30,
  height: 40,
  view: "toolbar",
  elements: [
    { view: "button", value: "Προβολή στον χάρτη" },
    { view: "button", value: "Λεπτομέρειες διαδρομής" },
  ],
};

var gridActiveRoutes = {
  container: "gridActiveRoutes",
  height: 500,
  //width: 300,
  type: "clean",
  rows: [
    {
      id: "dtableRequests",
      view: "datatable",
      editable: false,
      editaction: "dblclick",
      columns: [
        {
          id: "date",
          header: "Date",
          editor: "text",
          fillspace: 1,
          width: 150,
        },
        {
          id: "userEmail",
          header: "Customer email",
          editor: "text",
          fillspace: 1,
          width: 20,
        },
        {
          id: "name",
          header: "Guide Name",
          editor: "text",
          fillspace: 1,
          width: 20,
        },
      ],
      select: "row",
      on: {
        onItemClick: function (id, e, trg, cell) {
          // webix.message("Click on row: " + id.row + ", column: " + id.column);
          // console.log(arguments);
          // clearMap();
          // AddRoute(id.row);
        },
      },
      // load data from Routes
      url: "firebase->Requests/antonis_adraktas@gmail_com",
      // save data to Routes
      save: "firebase->Requests",
    },
    {
      view: "label",
      css: "label-form-details",
      label: "Map of Current Route",
    },
    {
      view: "toolbar",
      elementsConfig: {
        autowidth: true,
      },
      elements: [
        {
          view: "button",
          value: "Add marker",
          click: addMarker,
        },
        {
          view: "button",
          value: "Clear All",
          click: clearMap,
        },
      ],
    },
    {
      key: "AIzaSyCCRW0-JRt0BXsCvPQd_fJ77OxW6kREqrw",
      view: "google-map",
      id: "mapid2",
      zoom: 9,
      center: [37.98381, 23.727539],
    },
  ],
};

// *** MASTER DETAIL ***
var emlist = [
  {
    person: {
      email: "antonis.adraktas@gmail.com",
      name: "Antonis Adraktas",
      country: "Ελλάδα",
      phone: "+30 6947474747",
      resDate: "2020.12.15",
      comments: "Νέος πελάτης",
      route: "Custom Route",
      guide: "Antonis Papadopoulos",
      transport: "Citroen C4",
    },
  },
  {
    person: {
      email: "kontochr@gmail.com",
      name: "Chris Kontos",
      country: "USA",
      phone: "+353 20 919 2118",
      resDate: "2020.12.13",
      comments: "30 minutes call before arrival of guide",
      route: "Athens sea front",
      guide: "Antonis Papadopoulos",
      transport: "Opel Astra",
    },
  },
  {
    person: {
      email: "sheismartha@yahoo.com",
      name: "Martha",
      country: "Italy",
      phone: "+381 10 219 4118",
      resDate: "2020.12.22",
      comments: "-",
      route: "Historical center classic",
      guide: "Maria Karadima",
      transport: "Paugeot 307",
    },
  },
  {
    person: {
      email: "lemoniakara@gmail.com",
      name: "Lemonia Kara",
      country: "Greece",
      phone: "+30 210 2812328",
      resDate: "2021.01.01",
      comments: "New years present",
      route: "Custom Route",
      guide: "Antonis Papadopoulos",
      transport: "Paugeot 307",
    },
  },
  {
    person: {
      email: "pkotzani@gmail.com",
      name: "Kotzanikolaou Panos",
      country: "Greece",
      phone: "+30 6948484848",
      resDate: "2021.01.02",
      comments: "New years present",
      route: "Historical center classic",
      guide: "Antonis Papadopoulos",
      transport: "Citroen C4",
    },
  },
  {
    person: {
      email: "elena@gmail.com",
      name: "Elena Aggel",
      country: "Greece",
      phone: "+30 6984100200",
      resDate: "2021.01.05",
      comments: "New years present",
      route: "Custom Route",
      guide: "Eleni Papantoniou",
      transport: "Opel Astra",
    },
  },
  {
    person: {
      email: "JasonKontos@gmail.com",
      name: "Jason Kontos",
      country: "UK",
      phone: "+323 23847722",
      resDate: "2020.12.26",
      comments: "",
      route: "Historical center classic",
      guide: "Eleni Papantoniou",
      transport: "On foot",
    },
  },
];

var actions = {
  view: "datatable",
  autoConfig: true,
  autoheight: true,
  scroll: false,
  data: [
    { action: "Show only Start and End of Route" },
    { action: "Show Route and points of interest" },
    { action: "Show current position (live view)" },
  ],
  on: {
    onItemClick: function (id) {
      webix.message("Not completed in this version");
    },
  },
  click: function () {
    // var form = this.getFormView();
    // var values = form.getValues();
    // var grid = form.config.masterView;
    // var id = form.config.masterId;

    // grid.updateItem(id, { person: values });
    // $$("master-view").show();
    webix.message("Not completed in this version");
  },
};

var grid = {
  view: "datatable",
  id: "master",
  select: "row",
  columns: [
    {
      id: "email",
      header: "Email",
      template: "#person.email#",
      sort: "text",
      fillspace: 1,
      width: 40,
    },
    {
      id: "name",
      header: "Name",
      template: "#person.name#",
      fillspace: 1,
    },
    {
      id: "resDate",
      header: "Reservation",
      template: "#person.resDate#",
      fillspace: 1,
    },
    {
      id: "route",
      header: "Route",
      template: "#person.route#",
      fillspace: 1,
    },
  ],
  on: {
    onItemClick: function (id) {
      $$("details-view").show();
      $$("details-list").select(id.row);

      var view = $$("details");
      view.setValues(this.getItem(id).person);
      view.config.masterView = this;
      view.config.masterId = id;
    },
  },
  pager: "pagerU",
  data: emlist,
  autoheight: true,
  scroll: false,
};

var pager = { view: "pager", id: "pagerU", size: 5 };

var fields = [
  { view: "text", label: "Name", name: "name" },
  { view: "text", label: "Email", type: "email", name: "email" },
  {
    view: "text",
    label: "Pnone No",
    name: "phone",
    pattern: {
      mask: "+###-## ########",
      allow: /[0-9]/g,
    },
  },
  { view: "text", label: "Country", name: "country" },
  { view: "datepicker", label: "Reservation Date", name: "resDate" },
  { view: "textarea", label: "Comments", height: 100, name: "comments" },
  { view: "text", label: "Guide", name: "guide" },
  { view: "text", label: "Vehicle", name: "transport" },
  { view: "text", label: "Route name", name: "route" },
  {
    align: "right",
    inputWidth: 100,
    view: "button",
    value: "Edit",
    click: function () {
      analytics.logEvent("ActiveRoute", { name: "Edit-btn" });
      webix.message("Not completed in this version");
    },
  },
  {
    align: "right",
    inputWidth: 100,
    view: "button",
    value: "Save",
    click: function () {
      webix.message("Not completed in this version");
      analytics.logEvent("ActiveRoute", { name: "Save-btn" });
    },
  },
];

var details = {
  id: "details",
  view: "form",
  padding: 0,
  minWidth: 200,
  elements: [
    {
      view: "toolbar",
      cols: [
        { view: "label", label: "Request Details" },
        {
          view: "button",
          value: "Hide ^",
          width: 100,
          click: function () {
            $$("master-view").show();
            analytics.logEvent("ActiveRoute", { name: "ShowDetails" });
          },
        },
      ],
    },
    { padding: 10, rows: fields },
    //actions,
    {},
  ],
};

var list = {
  view: "list",
  select: true,
  id: "details-list",
  item: {
    width: 320,
    height: 65,
  },
  template: "<strong>#person.name#</strong></br>#person.email#",
  on: {
    onItemClick: function (id) {
      var view = $$("details");
      view.setValues(this.getItem(id).person);
      view.config.masterId = id;
    },
  },
};

var MasterDetail = {
  container: "MasterDetail",
  rows: [
    {
      type: "space",
      rows: [
        {
          animate: false,
          cells: [
            { id: "master-view", margin: 5, rows: [grid, pager, {}] },
            { id: "details-view", margin: 10, cols: [list, details] },
          ],
        },
      ],
    },
  ],
};

var mapActiveRoutes = {
  container: "mapActiveRoutes",
  height: 500,
  //width: 300,
  type: "clean",
  rows: [
    {
      view: "label",
      css: "label-form-details",
      label: "Map of Current Route",
    },
    {
      view: "toolbar",
      elementsConfig: {
        autowidth: true,
      },
      elements: [
        {
          view: "button",
          value: "Show only start/end of route",
          click: function () {
            webix.message("Not completed in this version");
            analytics.logEvent("ActiveRouteMaps", {
              name: "Show only start/end of route",
            });
          },
        },
        {
          view: "button",
          value: "Show all points of interest",
          click: function () {
            webix.message("Not completed in this version");
            analytics.logEvent("ActiveRouteMaps", {
              name: "Show all points of interest",
            });
          },
        },
        {
          view: "button",
          value: "Clear map",
          click: function () {
            webix.message("Not completed in this version");
            analytics.logEvent("ActiveRouteMaps", { name: "Clear map" });
          },
        },
      ],
    },
    {
      key: "AIzaSyCCRW0-JRt0BXsCvPQd_fJ77OxW6kREqrw",
      view: "google-map",
      id: "mapid3",
      zoom: 9,
      center: [37.98381, 23.727539],
    },
  ],
};

webix.ready(function () {
  getRequestArray();

  webix.ui(mapActiveRoutes);
  webix.ui(MasterDetail);
  webix.ui(labelActiveRoutes);
  webix.ui(mainLeftTab);
  $$("details-list").sync($$("master"));
});
