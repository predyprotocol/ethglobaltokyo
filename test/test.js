const { expectLoaded, expectPage, test } = require('@excaliburjs/testing');

test('A parcel v2 template', async (page) => {
  await expectLoaded();
  await page.waitForTimeout(500);
});