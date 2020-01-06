import * as functions from "firebase-functions";

import { AppModule } from "./server/app.module";
import { EggController } from "./server/egg/egg.controller";
import { ExpressAdapter } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import express from "express";
import next from "next";

// Nestjs Server

const server = express();

const createNestServer = async expressInstance => {
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );

  await nestApp.init();
  return nestApp;
};

const nestApp = createNestServer(server);

export const api = functions.https.onRequest(server);

export const onEggWrite = functions.firestore
  .document("Egg/{eggId}")
  .onWrite((change, context) => {
    nestApp.then(app => {
      return app.get(EggController).event(change, context);
    });
  });

// Nextjs Server

const nextApp = next({
  dev: false,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: "dist/client" }
});

const handle = nextApp.getRequestHandler();

export const nextjs = functions.https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log("File: " + request.originalUrl);
  return nextApp.prepare().then(() => handle(request, response));
});
