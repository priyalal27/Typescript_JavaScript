import { test, expect, request } from '@playwright/test';
const APIUtils = require('../utils/APIUtils.js');

test('e2e using util class', async ({ request }) => {

 const apiUtils = new APIUtils(request);
  await apiUtils.getToken();
  await apiUtils.add_to_cart();
  await apiUtils.place_order();
});




