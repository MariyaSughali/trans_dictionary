import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ClickContext } from "./ClickContext";

function DictionaryPop() {
  const [language, setLanguage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [toShow, setToShow] = useState(false);
  const [data, setData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const { isclicked, handleDictionary } = useContext(ClickContext);
  const [isvalid, setIsValid] = useState(true);
  const [languageId, setLanguageId] = useState("");

  useEffect(() => {
    setLanguageId(2);
    fetchDataByLanguageId();
  }, [languageId]);

  const fetchDataByLanguageId = async () => {
    try {
      const languageResponse = await axios.get(
        `http://localhost:9090/getlanguage/${languageId}`
      );
      const languageData = languageResponse.data;

      if (languageData && languageData.length > 0) {
        const languageName = languageData[0].language_name;
        setLanguage(languageName);
        handleLanguageChange();
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleLanguageChange = async () => {
    try {
      const categoryResponse = await axios.get(
        `http://localhost:9090/getcategory/${languageId}`
      );
      const categoryData = categoryResponse.data;

      if (categoryData && categoryData.length > 0) {
        setCategoryList(categoryData);
        resetSelections();
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const resetSelections = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSubcategoryList([]);
  };

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    try {
      const subcategoryResponse = await axios.get(
        `http://localhost:9090/getsubcategory/${selectedCategoryId}`
      );
      const subcategoryData = subcategoryResponse.data;

      if (subcategoryData && subcategoryData.length > 0) {
        setSubcategoryList(subcategoryData);
        setSelectedSubCategory("");
        setIsValid(true);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSelectedSubCategory(selectedSubCategoryId);
  };

  const handleApply = async () => {
    if (!selectedCategory) {
      setIsValid(false);
      return;
    }

    try {
      let url = selectedSubCategory
        ? `http://localhost:9090/getDataBysubcategory/${selectedSubCategory}`
        : `http://localhost:9090/getDataByCategory/${selectedCategory}`;

      const res = await axios.get(url);
      const responseData = res.data;

      if (responseData.length > 0) {
        setData(responseData);

        if (responseData.length > 0 && responseData[0].file_data) {
          const parsedFileData = JSON.parse(responseData[0].file_data);

          if (Array.isArray(parsedFileData) && parsedFileData.length > 0) {
            const firstObject = parsedFileData[0];
            const headings = Object.keys(firstObject);
            setHeadings(headings);
          }
        }
      } else {
        setData([]);
        setIsValid(false);
        setHeadings([]);
      }
      setToShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBackButtonClick = () => {
    setToShow(false);
    setIsValid(true);
  };
  const handleCloseButtonClick = () => {
    setToShow(false);
    handleDictionary(false);
  };

  const handleSearch = () => {
    setIsValid(false);

    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const tableRows = document.querySelectorAll(".table-container tbody tr");
    tableRows.forEach((row) => {
      const rowData = row.textContent.toLowerCase();
      if (rowData.startsWith(searchTerm)) {
        row.style.display = "table-row";
        setIsValid(true);
      } else {
        row.style.display = "none";
      }
    });
  };

  return (
    <div className="pop">
      {toShow ? (
        <div>
          <span
            className="material-symbols-outlined corner "
            onClick={handleCloseButtonClick}
          >
            close
          </span>
          {data && (
            <div>
              <div>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Type to search"
                  className="search_input"
                  onChange={handleSearch}
                />
              </div>
              <div className="table-container">
                {" "}
                <table>
                  <thead>
                    <tr>
                      {headings.map((heading, index) => (
                        <th key={index}>{heading.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(
                      (item, index) =>
                        Array.isArray(JSON.parse(item.file_data)) &&
                        JSON.parse(item.file_data).map((entry, subIndex) => (
                          <tr key={index + "-" + subIndex}>
                            {headings.map((key, colIndex) => (
                              <td key={colIndex}>{entry[key]}</td>
                            ))}
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>

              <div>{!isvalid && <h3>No data available</h3>}</div>
            </div>
          )}
          <button onClick={handleBackButtonClick}>Back</button>
        </div>
      ) : (
        <div>
          <span
            className="material-symbols-outlined corner "
            onClick={handleCloseButtonClick}
          >
            close
          </span>
          <p>Choose your dictionary</p>
          <label>Language </label>
          <br />
          <input className="language langinput" readOnly value={language} />
          <br />
          <label>Category </label>
          <br />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categoryList.map((cat, index) => (
              <option key={index} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
          <br />
          <label>Sub-category </label>
          <br />
          <select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
          >
            <option value="">All</option>
            {subcategoryList.map((subcat, index) => (
              <option key={index} value={subcat.category_id}>
                {subcat.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div className="center">
            <div className="error-message">
              {!isvalid && <h3>Select a category</h3>}
            </div>
            <div>
              <button onClick={handleApply}>APPLY</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DictionaryPop;
