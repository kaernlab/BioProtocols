.PHONY: student admin server

student:
	@cd student && yarn

admin:
	@cd admin && yarn

server:
	@cd server && yarn

app: student admin server