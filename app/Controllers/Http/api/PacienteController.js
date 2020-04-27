'use strict'
const _ = require('lodash');
const mongoose = require('mongoose');
const jsonpack = require('jsonpack');
const moment = require('moment');
const faker = require('faker');
const {performance, PerformanceObserver} = require('perf_hooks');
const mongo = require('../../../Mongo/Model');
const demoCnx = require('../../../Mongo/DemoCnx');

const obs = new PerformanceObserver((list) => {
  const entry = list.getEntries()[0]
  console.log(`Time for ('${entry.name}')`, entry.duration);
});
obs.observe({entryTypes: ['measure'], buffered: false});

// serviceRoot/People?$filter=FirstName eq 'Scott
class PacienteController {
  async get({params, request, response, view, auth, session}) {
    try {
      performance.mark('Checking [GET] api/pacientes response...');
      let query = request.get();
      let aggregate = [];
      if (query['$match']) {
        aggregate.push({"$match": JSON.parse(query['$match'])});
      }
      if (query['$project']) {
        aggregate.push({"$project": JSON.parse(query['$project'])});
      }
      if (query['$sort']) {
        aggregate.push({"$sort": JSON.parse(query['$sort'])});
      }
      if (query['$limit']) {
        aggregate.push({"$limit": parseInt(query['$limit'])});
      }
      if (query['$skip']) {
        aggregate.push({"$skip": parseInt(query['$skip'])});
      }
      let models = null;
      console.log(aggregate)
      if (aggregate.length) {
        console.log('x')
        models = await demoCnx.Role.aggregate(aggregate)
      }
      else {
        models = await demoCnx.Role.find();
      }

      performance.mark('Ending [GET] api/pacientes response...');
      performance.measure('Inputs validation', 'Checking [GET] api/pacientes response...', 'Ending [GET] api/pacientes response...');
      return response.ok(models);
    }
    catch (e) {
      performance.mark('Ending [GET] api/pacientes response...');
      performance.measure('Inputs validation', 'Checking [GET] api/pacientes response...', 'Ending [GET] api/pacientes response...');
      console.log(e);
      return response.internalServerError(e);
    }

  }
  async post({params, request, response, view, auth, session}) {
    try {
      performance.mark('Checking [POST] api/pacientes response...');
      let query = request.post();
      let model = new demoCnx.Role(query);
      await model.save();
      performance.mark('Ending [POST] api/pacientes response...');
      performance.measure('Inputs validation', 'Checking [POST] api/pacientes response...', 'Ending [POST] api/pacientes response...');
      return response.ok(model);
    }
    catch (e) {
      performance.mark('Ending [POST api/pacientes response...');
      performance.measure('Inputs validation', 'Checking [POST] api/pacientes response...', 'Ending [POST] api/pacientes response...');
      console.log(e);
      return response.internalServerError(e);
    }

  }
  async post_id({params, request, response, view, auth, session}) {
    try {
      performance.mark('Checking [POST] api/pacientes/id response...');
      let _id = params.id;
      let query = request.post();
      let model = await demoCnx.Role.findOne({_id: _id});
      if (model) {
        await demoCnx.Role.updateOne({_id: model._id}, query);
        performance.mark('Ending [POST] api/pacientes/id response...');
        performance.measure('Inputs validation', 'Checking [POST] api/pacientes/id response...', 'Ending [POST] api/pacientes/id response...');
        let newModel = await demoCnx.Role.findOne({_id: _id});
        return response.ok(newModel);
      }
      else {
        return response.notAcceptable();
      }
    }
    catch (e) {
      performance.mark('Ending [POST] api/pacientes/id response...');
      performance.measure('Inputs validation', 'Checking [POST] api/pacientes/id response...', 'Ending [POST] api/pacientes/id response...');
      console.log(e);
      return response.internalServerError(e);
    }

  }
  async get_id({params, request, response, view, auth, session}) {
    try {
      performance.mark('Checking [GET] api/pacientes/id response...');
      let _id = params.id;
      let query = request.post();
      let model = await demoCnx.Role.findOne({_id: _id});
      if (model) {
        performance.mark('Ending [GET] api/pacientes/id response...');
        performance.measure('Inputs validation', 'Checking [GET] api/pacientes/id response...', 'Ending [GET] api/pacientes/id response...');
        return response.ok(model);
      }
      else {
          return response.notAcceptable();
      }
    }
    catch (e) {
      performance.mark('Ending [GET] api/pacientes/id response...');
      performance.measure('Inputs validation', 'Checking [GET] api/pacientes/id response...', 'Ending [GET] api/pacientes/id response...');
      console.log(e);
      return response.internalServerError(e);
    }

  }
  async delete_id({params, request, response, view, auth, session}) {
    try {
      performance.mark('Checking [DELETE] api/pacientes/id response...');
      let _id = params.id;
      console.log(_id)
      let model = await demoCnx.Role.findOne({_id: _id});
      console.log(model)
      if (model) {
        await demoCnx.Role.deleteOne({_id: model._id});
        performance.mark('Ending [DELETE] api/pacientes/id response...');
        performance.measure('Inputs validation', 'Checking [DELETE] api/pacientes/id response...', 'Ending [DELETE] api/pacientes/id response...');
        return response.ok();
      }
      else {
        return response.notAcceptable();
      }
    }
    catch (e) {
      performance.mark('Ending [POST] api/pacientes/id response...');
      performance.measure('Inputs validation', 'Checking [POST] api/pacientes/id response...', 'Ending [POST] api/pacientes/id response...');
      console.log(e);
      return response.internalServerError(e);
    }

  }
}

module.exports = PacienteController
