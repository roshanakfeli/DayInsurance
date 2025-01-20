import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../hook/debounce";

const DebouncedInput = ({ checkAgencyCodeHandler }) => {
  const [inputValue, setInputValue] = useState(""); // For the input value
  const [apiError, setApiError] = useState(false); // Error state
  const [loading, setLoading] = useState(false); // Loading state
  const debouncedValue = useDebounce(inputValue, 2000); // Debounced value

  // Call the API when the debounced value changes
  useEffect(() => {
    if (debouncedValue === "") return; // Skip API call if input is empty

    setLoading(true);
    setApiError(false);

    checkAgencyCodeHandler(debouncedValue)
      .then(() => {
        setApiError(false); // Reset error state on success
      })
      .catch(() => {
        setApiError(true); // Set error state on failure
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, [debouncedValue, checkAgencyCodeHandler]);

  const clearInput = () => {
    setInputValue("");
    setApiError(false); // Reset error state
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter agency code"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {loading && (
        <div className="absolute right-2 top-2">
          <span>Loading...</span> {/* Replace with a spinner */}
        </div>
      )}
      {!loading && apiError && (
        <button
          className="absolute right-2 top-2 text-red-500"
          onClick={clearInput}
        >
          ✖ {/* Close icon */}
        </button>
      )}
      {!loading && !apiError && debouncedValue && (
        <div className="absolute right-2 top-2 text-green-500">
          ✔ {/* Success icon */}
        </div>
      )}
    </div>
  );
};

export default DebouncedInput;
