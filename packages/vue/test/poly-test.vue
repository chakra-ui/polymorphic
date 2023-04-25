<script setup lang="ts">
import { polymorphicFactory } from '../src'
import { ref } from 'vue'

const poly = polymorphicFactory()
const message = ref('test')
const selectValue = ref('3')
const radioValue = ref('vue')
const checkedNames = ref([])
const singleCheckbox = ref(true)
</script>
<template>
  <poly.input v-model="message" data-testid="poly-input" />
  <poly.div data-testid="poly-div">{{ message }}</poly.div>
  <poly.select v-model="selectValue" data-testid="poly-select">
    <poly.option value="1">Value 1</poly.option>
    <poly.option value="2">Value 2</poly.option>
    <poly.option value="3">Value 3</poly.option>
  </poly.select>
  <poly.p>selected : {{ selectValue }}</poly.p>

  <poly.div>
    <poly.input name="framework" type="radio" v-model="radioValue" value="vue"></poly.input>
    <poly.input name="framework" type="radio" value="react" v-model="radioValue" data-testid="react-radio"></poly.input>
    <poly.input name="framework" type="radio" value="angular" v-model="radioValue"></poly.input>
  </poly.div>
  <poly.p>Radio: {{ radioValue }}</poly.p>

  <poly.div>
    <poly.input type="checkbox" id="jack" value="Jack" v-model="checkedNames"  data-testid="checkbox-jack"/>
    <poly.label for="jack">Jack</poly.label>
    <poly.input type="checkbox" id="john" value="John" v-model="checkedNames" data-testid="checkbox-john" />
    <poly.label for="john">John</poly.label>
    <poly.input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <poly.label for="mike">Mike</poly.label>
  </poly.div>
  <poly.p>checked : {{checkedNames.join(',')}}</poly.p>
  <poly.input type="checkbox" v-model="singleCheckbox" data-testid="single-checkbox"/>
  <poly.p>single checked : {{singleCheckbox}}</poly.p>
</template>
