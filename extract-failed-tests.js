const fs = require('fs');
const path = require('path');

function extractFailedTests() {
    try {
        // Read the results.json file
        const resultsPath = path.join(__dirname, 'reports', 'results.json');
        const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
        
        const failedTests = [];
        
        // Extract failed tests from the results
        if (results.suites) {
            results.suites.forEach(suite => {
                if (suite.specs) {
                    suite.specs.forEach(spec => {
                        if (spec.tests) {
                            spec.tests.forEach(test => {
                                if (test.results && test.results.length > 0) {
                                    const lastResult = test.results[test.results.length - 1];
                                    if (lastResult.status === 'failed') {
                                        failedTests.push({
                                            file: suite.file,
                                            title: spec.title,
                                            fullName: `${suite.file} - ${spec.title}`,
                                            error: lastResult.error?.message || 'Unknown error',
                                            line: lastResult.errorLocation?.line || 'Unknown'
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
        
        // Save failed tests to a file
        const failedTestsPath = path.join(__dirname, 'failed-tests.json');
        fs.writeFileSync(failedTestsPath, JSON.stringify(failedTests, null, 2));
        
        // Also create a simple text file with just test names for easy reading
        const failedTestsTextPath = path.join(__dirname, 'failed-tests.txt');
        const failedTestsText = failedTests.map(test => test.title).join('\n');
        fs.writeFileSync(failedTestsTextPath, failedTestsText);
        
        console.log(`Found ${failedTests.length} failed tests:`);
        failedTests.forEach((test, index) => {
            console.log(`${index + 1}. ${test.title} (${test.file}:${test.line})`);
        });
        
        console.log(`\nFailed tests saved to:`);
        console.log(`- ${failedTestsPath}`);
        console.log(`- ${failedTestsTextPath}`);
        
        return failedTests;
        
    } catch (error) {
        console.error('Error extracting failed tests:', error.message);
        return [];
    }
}

// Run the extraction if this script is executed directly
if (require.main === module) {
    extractFailedTests();
}

module.exports = { extractFailedTests }; 