# sample-sizer
<img width="179" alt="screen shot 2016-04-27 at 14 52 43" src="https://cloud.githubusercontent.com/assets/8107614/14864457/f15aeb38-0c87-11e6-97ec-e635e546ee64.png">

Sample Sizer uses Student's [T-Distribution to identify minimum sample sizes](http://www.itl.nist.gov/div898/handbook/prc/section2/prc222.htm). If you find yourself asking the question, "do I have enough data?" you'll be able to answer your question with this tool.


#### Minimum Sample Sizes
The calculation of a minimum sample size a function of your samples _Degrees of Freedom_, _Standard Deviation_, and _T-Critical Value_, which is a function of those _Degrees of Freedom_ and your desired _Confidence_ level.  


#### Usage
When you call the main function in `index.js`, you'll need to provide a _sample_ (array), a _confidence_ value (float), and an _error tolerance_ (int). 

The following code asks the question, "If this is my sample, how many observations do I need to estimate the population average +/- 3, with 90% confidence.
```
var sizer = require('sample-sizer');
var minimumSize1 = sizer([1,2,3,2,1,2,3,99], .9, 3);
```

If the number you get is less than the length of your sample array, you need to increase your sample size! You can't be (as) confident (as you want to be) that your data is representative of the population.
