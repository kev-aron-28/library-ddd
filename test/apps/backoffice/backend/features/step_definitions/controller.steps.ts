import { Given, Then } from "@cucumber/cucumber";
import request from "supertest";
import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;

Given('I send a POST request to {string} with body:', function (route: string, body: string) {
  _request = request(application.httpServer!).post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async function (expectedStatusCode: number) {
  _response = await _request.expect(expectedStatusCode);
});
