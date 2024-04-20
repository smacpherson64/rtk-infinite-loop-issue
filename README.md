# RTK Query Infinite Loop Issue

Recreation of the RTKQuery infinite loop issue where isLoading is reset for parent components.

### Get Started

1. Download repo and install dependencies
2. Run `yarn start`
3. Check the console to see if `console.log("PARENT isLoading", isLoading);` continually repeats from true to false.
