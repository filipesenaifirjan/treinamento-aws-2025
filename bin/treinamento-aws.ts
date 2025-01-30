#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoListApiStack } from '../lib/todoListApi-stack';
import { TodoTaskAppStack } from '../lib/todoTaskApp-stack';
import { TodoListLayersStack } from '../lib/todoListLayers-stack';
//import { TodoListLayersStack } from '../lib/todoListLayers-stack';

const app = new cdk.App();


const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
}

const tags = {
  cost: "Treinamento - AWS",
  team: "DEVs T2m"
}

const todoListLayersStack = new TodoListLayersStack(app, "TodoListLayersStack",{
  env: env,
  tags: tags
})

const todoTaskAppStack = new TodoTaskAppStack(app, "TodoTaskAppStack",{
  env: env,
  tags: tags
})
todoTaskAppStack.addDependency(todoListLayersStack)

const todoListApiStack = new TodoListApiStack(app, "TodoListApiStack", {
  lambdaTodoTaskApp: todoTaskAppStack.taskHandler,
  env: env,
  tags: tags
})

todoListApiStack.addDependency(todoTaskAppStack)
