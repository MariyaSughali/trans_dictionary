const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.login": "admin",
      "sonar.password": "sughali",
      "sonar.projectName": "react_app",
      "sonar.projectDescription": "Just for demo...",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.sources": "./src",
      "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
      "sonar.exclusions": "**/*.test.tsx",
      "sonar.tests": "C:/Users/MariyaSughali/Desktop/dictionary/backend",
      "sonar.testExecutionReportPaths": "test-report.xml",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
    },
  },
  () => process.exit()
);
