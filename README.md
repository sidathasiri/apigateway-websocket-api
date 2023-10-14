# Real-Time WebSocket API with AWS API Gateway and CDK

Welcome to the Real-Time WebSocket API example using AWS API Gateway and AWS CDK. This repository demonstrates how to set up and deploy a WebSocket API for real-time communication using the AWS Cloud Development Kit (CDK).

## Overview

In this repository, we've created a sample WebSocket API that showcases real-time communication. This README will guide you through setting up the development environment, understanding the project structure, deploying the WebSocket API, and testing its functionality.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- AWS Account
- AWS CDK installed and configured
- Node.js and npm installed
- Git
- AWS CLI

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Add aws account id and aws region in `bin/apigateway-websocket-api.ts`
4. Setup AWS credentials to access the AWS account from local
5. Run `cdk deploy`

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
