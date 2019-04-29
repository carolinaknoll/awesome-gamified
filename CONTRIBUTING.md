### humans
:school_satchel: HumanS - A Human School for the good, the beautiful and the delicate topics we have to learn ourselves.

***

HumanS is a project with the idea of turning list data like awesome lists, like awesome-mental-health and awesome-programming, into gamified experiences. 

#### Contribute with content

For content contributions, please follow the structure on the `topics-en.js` file. If you want to contribute with content in another language, like portuguese or spanish, please note the project will be updated to allow this in the future. 

#### Subjects and Subtopics
A subject is a name for a topic that will hold different subtopics that are related to it. For example, Emotional Intelligence is a subject which holds subtopics like Self Awareness. If you have a subject with subtopic content, please create a new subject object on the topics file referred above. 

On your new subject object, please add:
- A `name`
- An `icon` which will be it's badge
- A `nightlyBackground` and a `brightlyBackground` which are the background colors that will be displayed on your subject depending on which theme you are viewing the project. It is asked that you use the same color for both (e.g., red or blue) but in different tones. Following this convention, please add the lighter tone of your chosen color to `brightlyBackground` and the darker tone to `nightlyBackground`. 
- An array of subtopic objects, which will hold your subtopic name (like Self Awareness, as explained above) and the entries with the name and the url for the related content.

Thank you for taking your time to contribute! :bowtie:
