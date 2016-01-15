# score_widget

The score widget project is a JavaScript based scoring web page widget that I created to collect scores from professional sessions.
It is to be part of a database driven web page app that allows scores to be taken for multiple objective/goals and then stored to 
a database.

This example is object-based and multiple widgets can be instaciated provided that each has a session_stamp corresponding in the ids
of the html widget. You will see that "111111" is used in this example as a means to both instanciate and identify the widget on the page.
This can be populated by a database query in a multi-instance model using a time_stamp for the session_stamp.

This example values and updates to the screen, however, the AJAX request is in place to point to a database object to be written to.
There is an is_update Y and N flag sent to the ajax request to test if a query should write or update the database record.
