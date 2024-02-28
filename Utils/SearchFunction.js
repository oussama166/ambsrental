import data from "@/public/data/dataBackup.json";

export const searchOccurnece = (searchCible, CibleRoute = false) => {
  let searchResults = [];
  if (searchCible === "") {
    return [];
  }

  Object.keys(data).forEach((category) => {
    if (category !== "Nacelle") {
      Object.keys(data[category]).forEach((subcategory) => {
        // Filter items in the current subcategory based on Designation
        data[category][subcategory].filter((item) => {
          if (CibleRoute === false) {
            console.log(item.Designation.search(searchCible));
            if (
              item.Designation.search(searchCible) != -1 ||
              item.Info.find((elem) => elem === searchCible)
            ) {
              searchResults.push(item);
            }
          } else {
            if (item.id === searchCible) {
              searchResults.push(item);
            }
          }
        });
      });
    }
  });
  return searchResults;
};
export const searchOccurenceBig = (
  MainCategory = "",
  categorie = "",
  type = ""
) => {
  if (type === "") {
    return data[MainCategory][categorie];
  }
  return data[MainCategory][categorie][type];
};
export const searchCible = (searchCible) => {
  const allProducts = [];
  Object.keys(data[searchCible]).map((elem) => {
    const dataObj = data[searchCible][elem];
    allProducts.push({
      title: elem,
      data: dataObj,
    });
  });
  return allProducts;
};

export const conbineSearch = (MainCategory, categorie) => {
  const allData = [];
  // get data from the electrique and the diesel side
  let electrique = searchOccurenceBig(MainCategory, categorie, "electrique");
  electrique.map((elem) => {
    elem["typeObj"] = "electrique";
    allData.push(elem);
  });
  let diesel = searchOccurenceBig(MainCategory, categorie, "diesel");
  diesel.map((elem) => {
    elem["typeObj"] = "diesel";
    allData.push(elem);
  });
  return allData;
};

export const SearchProduct = (searchCible, cat) => {
  let resuSearch = [];
  if (searchCible == undefined || cat == undefined) {
    searchCible = "ELPT terminal";
    cat = "Batteries,Chargers";
  }
  // the case if the searching cat is not a chariot or nacelle
  const ElectricalDiselProduct = ["Nacelle", "Chariot"];
  if (!ElectricalDiselProduct.includes(cat)) {
    Object.keys(data[cat]).forEach((seconCat) => {
      data[cat][seconCat].map((elem) => {
        elem["Info"].map((elemSerach) => {
          if (elemSerach.search(searchCible) != -1) {
            elem["search"] = cat;
            elem["secondSearch"] = seconCat;
            resuSearch.push(elem);
          }
        });
      });
    });
  } else {
    Object.keys(data[cat]).forEach((seconCat) => {
      if (
        Object.keys(data[cat][seconCat]).includes("diesel") == false ||
        !Object.keys(data[cat][seconCat]).includes("electriques") == false
      ) {
        Object.keys(data[cat][seconCat]).map((thirthCat) => {
          data[cat][seconCat][thirthCat].map((elem) => {
            elem["Info"].map((elemSerach) => {
              if (elemSerach.search(searchCible) != -1) {
                elem["search"] = cat;
                elem["secondSearch"] = seconCat;
                resuSearch.push(elem);
              }
            });
          });
        });
      } else {
        Object.keys(data[cat][seconCat]).map((type) => {
          data[cat][seconCat][type].map((elem) => {
            elem["Info"].map((elemSerach) => {
              if (elemSerach.search(searchCible) != -1) {
                elem["search"] = cat;
                elem["secondSearch"] = seconCat;
                resuSearch.push(elem);
              }
            });
          });
        });
      }
    });
  }

  return resuSearch;
};

export const serachFromPath = (id, cat, subCat, type = "none type") => {
  if (type == "none type") {
    data[cat][subCat].map((elem) => {
      if (elem["id"] == id) return elem;
    });
  } else {
    data[cat][subCat][type].map((elem) => {
      if (elem["id"] == id) return elem;
    });
  }
};
