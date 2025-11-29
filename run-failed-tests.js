const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runFailedTests() {
    try {
        // Read the failed tests file
        const failedTestsPath = path.join(__dirname, 'failed-tests.json');
        
        if (!fs.existsSync(failedTestsPath)) {
            console.log('No failed-tests.json file found. Run extract-failed-tests.js first.');
            return;
        }
        
        const failedTests = JSON.parse(fs.readFileSync(failedTestsPath, 'utf8'));
        
        if (failedTests.length === 0) {
            console.log('No failed tests found in the file.');
            return;
        }
        
        console.log(`Found ${failedTests.length} failed tests to re-run:`);
        failedTests.forEach((test, index) => {
            console.log(`${index + 1}. ${test.title}`);
        });
        
        // Group tests by file for efficient execution
        const testsByFile = {};
        failedTests.forEach(test => {
            if (!testsByFile[test.file]) {
                testsByFile[test.file] = [];
            }
            testsByFile[test.file].push(test.title);
        });
        
        console.log('\nRunning failed tests by file...\n');
        
        // Run tests for each file
        Object.keys(testsByFile).forEach(file => {
            const testNames = testsByFile[file];
            console.log(`\n--- Running tests from ${file} ---`);
            
            testNames.forEach(testName => {
                console.log(`\nRunning: ${testName}`);
                try {
                    const command = `docker run --rm -v $(pwd)/reports:/app/reports -e FILE_NAME="tests/${file}" -e TEST_NAME="${testName}" playwright-runner`;
                    console.log(`Command: ${command}`);
                    
                    const output = execSync(command, { 
                        encoding: 'utf8',
                        stdio: 'pipe'
                    });
                    console.log(output);
                } catch (error) {
                    console.error(`Error running test "${testName}":`, error.message);
                }
            });
        });
        
        console.log('\n--- Failed tests re-run completed ---');
        
    } catch (error) {
        console.error('Error running failed tests:', error.message);
    }
}

// Run the script if executed directly
if (require.main === module) {
    runFailedTests();
}

module.exports = { runFailedTests }; 