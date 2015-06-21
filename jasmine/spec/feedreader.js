/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('has a URL', function(){
			for(var i=0; i<allFeeds.length; i++){
				var url = allFeeds[i].url;
				expect(url).toBeDefined();
				expect(url).not.toBe("");
			}
		 });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('has a name', function(){
			for(var i=0; i<allFeeds.length; i++){
				var name = allFeeds[i].name;
				expect(name).toBeDefined();
				expect(name).not.toBe("");
			}
		 });

    });


    /* Test suite named "The menu" */
	describe('The menu', function(){

        /* This test ensures the menu element is hidden by default.
		 Used Chrome Console and JQuery CSS (http://api.jquery.com/css/)
		 to determine the value of ".menu" on page load.
		 The body "menu-hidden" class was adding a rule to ".menu"
		 The CSS property transform with X value of -192 is causing the menu to be offscreen (and therefore hidden from user's view.)
			 $('.menu').css('transform')
			"matrix(1, 0, 0, 1, -192, 0)"
		 Now we need to get the X value using $().position() and make sure the left is -192.
		*/
		it('is hidden by default', function(){
			var cssValue = $('.menu').position();
			expect(cssValue.left).toBe(-192);
		});

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.

		  We will use jQuery's trigger("click") method to invoke a click action

		  Instead of checking the "x" value like before, the test will ensure
		  that the class that causes the change in visibility has loaded.

		  Using the "transitionend" function in jQuery didn't help running the test
		  soon after the transitioned finished.
          */

		it('is visible when clicked and hides when clicked again', function(){
			$('.menu-icon-link').trigger('click');
			var bodyClass = $('body').hasClass('menu-hidden');
			expect(bodyClass).toBe(false);

			$('.menu-icon-link').trigger('click');
			var bodyClass = $('body').hasClass('menu-hidden');
			expect(bodyClass).toBe(true);
		});
	});


    /* Test suite named "Initial Entries" */
	describe('Initial Entries', function(){
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
		*/

		/*
			Calling loadFeed(0) to load the initial feed and then using
			jQuery to count how many "entry" classes have been created.
		*/
		beforeEach(function(done){
			loadFeed(0, function(){
				done();
			});
		});

		it('at least one entry in container', function(done){
			var entries = $('.feed .entry').length;
			expect(entries).toBeGreaterThan(0);
			done();
		});
	});

    /* Test suite named "New Feed Selection" */
	describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var textToBeChecked = "";
		/*
			Load the initial feed.
		*/
		beforeEach(function(done){
			loadFeed(0, function(){
				done();
			});
		});

		it('has text', function(done){
			var textToBeChecked = $('.feed .entry').text();
			expect(textToBeChecked).not.toBe("");
			done();
		});

		/*
			Nested describe for checking the value of the newly loaded
			feed.
		*/
		describe('Loading new feed', function(){
			beforeEach(function(done){
				loadFeed(1, function(){
					done();
				});
			});

			it('has different text than the original one', function(done){
				var newText = $('.feed .entry').text();
				expect(newText).not.toBe(textToBeChecked);
				done();
			});
		});
	});
}());
