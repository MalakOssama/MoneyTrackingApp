# MoneyTrackingApp:
a basic React Native application to track personal finances, focusing on income and expenses

# Key features:
-User can add a new transaction by pressing the add button and entering the required data
-User can view all transactions history
-User can filter transactions according to its type (income/expense)
-User can sort the transactions according to the date
-User can view their balance summary for the current mont
-User can view their expenses habits based on category through a pie chart

#Technologies used:
React native, javascript, expo

#Getting started:
-clone the project and open in visual studio code.
-Download the expo go app on your mobile.
-Open the terminal in vscode and install dependencies using the command 'npx expo install' and run the command 'npx expo start'
-Scan the qr code with your mobile's camera.

#Project Architecture:
there are two Screens, one for the summary and one for the transactions, Both in the folder app/screens
there are 4 main components:
2 of which are used in the transactions screen and 2 in the summary screen

transactions screen components:
app/components/transactions/TransactionInputForm.js
app/components/transactions/TransactionListItem.js

Summary screen components:
app/components/summary/GraphSummary.js
app/components/summary/BalanceSummary.js

there is one navigation file found in app/navigation/AppNavigation. the type of navigation used in this project is bottom tabs navigation with transactions tab and summary tab.

there is a utils folder that so far contains one file (app/utils/DateHelper.js) with helper functions.

the total time taken for this assignemt to be finished was 9
hours
