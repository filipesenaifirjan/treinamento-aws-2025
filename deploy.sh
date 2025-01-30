#!/bin/bash

# Especifica as stacks a serem usadas
cdk deploy TodoTaskAppStack TodoListApiStack
# ou para incluir todas as stacks
# cdk deploy --all
