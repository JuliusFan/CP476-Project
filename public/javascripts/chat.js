const socket = io();

$(document).ready(async () => {	
	/* Chatbox functions */
	// Gets initial messages from server
	socket.on("loadChatroom", (msg) => {
		let username = msg.username;
		let message = msg.message;
		let time = msg.time;
		$("#messageTable").append("<tr><td>" + username + "</td><td>" + message + "</td></tr>");	
	});

	// Sending input box' message on send button press
	$("#sendButton").on("click", async () => {
		let username = $("#username").text();
		let message = $('#messageBox').val();
		if (username && message) {
			$("#messageTable").append("<tr><td>" + username + "</td><td>" + message + "</td></tr>")
			await socket.emit("chat", message, username, Date.now());			
			$('#messageBox').val("");
		}
	});

	// Sending input box' message on enter key
	$("#messageBox").on("keypress", async (e) => {
		if (e.key === "Enter") {
			let username = $("#username").text();
			let message = $('#messageBox').val();
			if (username && message) {
				$("#messageTable").append("<tr><td>" + username + "</td><td>" + message + "</td></tr>")
				await socket.emit("chat", message, username, Date.now());			
				$('#messageBox').val("");
			}
		}
	});
});
