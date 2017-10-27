//Removes other text field if JS is active
$("#otherJSoff").hide();

//Focuses onto first input field
$("#name").focus();

//Inserts textarea if "other" is selected from Job Roles dropdown
let otherInput = $("<input type='text' placeholder='Your Job Role'/>");
$("#title").change((e) => {	
	if(e.target.value === "other") {	
    	$("select#title").after(otherInput);
    	console.log(otherInput);
	} else {
		$(otherInput).remove();		
	}
});

//Displays correct t shirt colors based on design selection
$("#design").change((e) => {	
	if(e.target.value === "js puns") {	
    	$("#color option[value='tomato'], option[value='steelblue'], option[value='dimgrey']").hide();
    	$("#color option[value='cornflowerblue'], option[value='darkslategrey'], option[value='gold']").show();

	}
	if(e.target.value === "heart js") {	
    	$("#color option[value='cornflowerblue'], option[value='darkslategrey'], option[value='gold']").hide();
    	$("#color option[value='tomato'], option[value='steelblue'], option[value='dimgrey']").show();
	}
});


//Disables checkboxes for conflicting dates

$(".activities label").change((e) => {
	let state = ($(e.target).is(":checked"));

	let selection = (e.target.nextSibling.textContent.indexOf("Tuesday 9am"));
	let checkbox = $(".activities label:contains('Tuesday 9am')")

	let selection2 = (e.target.nextSibling.textContent.indexOf("Tuesday 1pm"));
	let checkbox2 = $(".activities label:contains('Tuesday 1pm')")

		if (state==true && selection > 0) {
			checkbox.contents().attr("disabled", true)
			$(e.target).attr("disabled", false);
			checkbox.css("color", "grey")
			$(e.target).parent().css("color", "black");
		} else if (state==false && selection > 0) {
			checkbox.contents().attr("disabled", false);
			checkbox.css("color", "black")
			$(e.target).attr("disabled", false);
		}

		if (state==true && selection2 > 0) {
			checkbox2.contents().attr("disabled", true);
			$(e.target).attr("disabled", false);
			checkbox2.css("color", "grey")
			$(e.target).parent().css("color", "black");
		} else if (state==false && selection2 > 0) {
			checkbox2.contents().attr("disabled", false);
			$(e.target).attr("disabled", false);
			checkbox2.css("color", "black")
		}
});

//Running total cost of activities

let cost = 0;

$(".activities label").change((e) => {	
let state = ($(e.target).is(":checked"));
	if (e.target.nextSibling.textContent.indexOf("$200")>0 && state==true) {
		cost += 200;
		console.log(cost)
	} else if (e.target.nextSibling.textContent.indexOf("$200")>0 && state==false) {
		cost -= 200;
		console.log(cost)
	}

	if (e.target.nextSibling.textContent.indexOf("$100")>0 && state==true) {
		cost += 100;
		console.log(cost)
	} else if (e.target.nextSibling.textContent.indexOf("$100")>0 && state==false) {
		cost -= 100;
		console.log(cost)
	}

let runningTotal = $("<p class='cost'> TOTAL: $" + cost + "</p>" );
$(".activities").after(runningTotal)
$(".cost").next(".cost").remove();

});

//Selects appropriate payment field options based on user selection
let paymentType = "credit card";
$("#payment").val('credit card');
$("fieldset p:contains('Bitcoin')").hide();
$("fieldset p:contains('Paypal')").hide();
$("#payment").change((e) => {	
	$("option[value=select_method]").hide();
	if(e.target.value === "paypal") {
		paymentType = "paypal";
		$("fieldset p:contains('Bitcoin')").hide();
		$("fieldset p:contains('Paypal')").show();
		$("#credit-card").hide();
		$("button").wrap("<a href='https://www.paypal.com'></a>");
	}
		if(e.target.value === "bitcoin") {
		paymentType = "bitcoin";
		$("fieldset p:contains('Paypal')").hide();
		$("fieldset p:contains('Bitcoin')").show();
		$("#credit-card").hide();
		$("button").wrap("<a href='https://www.coinbase.com/'></a>");
	}
		if(e.target.value === "credit card") {
		paymentType = "credit card";
		$("fieldset p:contains('Paypal')").hide();
		$("fieldset p:contains('Bitcoin')").hide();
		$("#credit-card").show();
	}
});

//Validation Function to disable or enable register button

let name = false;
let mail = false;
let act = false;
let ccnum = false;
let zip = false;
let cvv = false

$("button").prop("disabled",true).css("background","grey");
let enable = () => {	
	if (name === true && mail === true && act === true && ccnum === true && zip === true && cvv === true) {
		$("button").prop("disabled",false).css("background","");
	} else {
		$("button").prop("disabled",true).css("background","grey");
	}
};

//Highlights border red if name left blank
$("#name").keyup(() => {
	if($("#name").val().length === 0 || $("#name").val().indexOf (' ') >= 0) {
		$("#name").css("border", "red 2px solid");
		name = false;
		enable();
    } else if ($("#name").val().length > 0) {
		$("#name").css("border", "none")
		name = true;
		enable();
	}
});

//Used lenth of 6 because you typically need at least these many characters to write a valid email address (ex: 1@1.ca)
$("#mail").keyup(() => {
	if(($("#mail").val().indexOf ('@')) <= 0 ||
	  ($("#mail").val().indexOf ('.')) <= 0 ||
	  ($("#mail").val().length < 6 )) {
		$("#mail").css("border", "red 2px solid")
		mail = false;
		enable();	
	} else {
		$("#mail").css("border", "none")
		mail = true;
		enable();
	}
});

//Prompts user to select at least one activity
$("#activities").after("<p style='color:red' class='errmsg'>Please select at least one activity</p>");
$(".activities label").change(() => {
	if (cost === 0) {
		$(".errmsg").show();
		act = false;
		enable();
	} else if (cost > 0) {
		$(".errmsg").hide();
		act = true;
		enable();
	}
});

//Credit card validation
$("#payment").change((e) => {
	if(paymentType !== "credit card") {
		ccnum = true;
		zip = true;
		cvv = true
		enable();
	} else {
		ccnum = false;
		zip = false;
		cvv = false;
		$("#credit-card input").val('');
		enable();
	}
});


$("#cc-num").keyup(() => {
	let creditNum = $("#cc-num").val();
	let isNumeric = ($.isNumeric(creditNum));
	if (creditNum.length > 16 || creditNum.length < 13 || isNumeric === false) {
		$("#cc-num").css("border", "red 2px solid");
		ccnum = false;
		enable();
	} else {
		$("#cc-num").css("border", "none")
		ccnum = true;
		enable();
	}
});

$("#zip").keyup(() => {
	let zipNum = $("#zip").val();
	let isNumeric = ($.isNumeric(zipNum));
	if (zipNum.length !== 5 || isNumeric === false) {
		$("#zip").css("border", "red 2px solid");
		zip = false
		enable();
	} else {
		$("#zip").css("border", "none")
		zip = true;
		enable();
	}
});

$("#cvv").keyup(() => {
	let cvvNum = $("#cvv").val();
	let isNumeric = ($.isNumeric(cvvNum));
	if (cvvNum.length !== 3 || isNumeric === false) {
		$("#cvv").css("border", "red 2px solid");
		cvv = false;
		enable();
	} else {
		$("#cvv").css("border", "none")
		cvv = true;
		enable();
	}
});














