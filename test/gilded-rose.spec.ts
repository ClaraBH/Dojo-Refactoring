import {
  AgedBrieItem,
  GildedRose,
  Item,
  NormalItem,
  SulfurasItem,
} from "../app/gilded-rose";

describe("Initial Test", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("GildedRose", () => {
  describe("Object construction", () => {
    it("should construct the guiledRose inventory with an empty list of items", () => {
      const gildedRose = new GildedRose();
      expect(gildedRose.items.length).toBe(0);
    });

    it("should construct the guiledRose inventory with an non empty list of items", () => {
      const gildedRose = new GildedRose([new Item("Normal Item", 5, 0)]);
      expect(gildedRose.items.length).toBe(1);
    });
  });

  describe("Normal Item", () => {
    it("should decrease quality and sellIn for normal items", () => {
      const gildedRose = new GildedRose([new NormalItem(10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(19);
      expect(items[0].sellIn).toBe(9);
    });

    it("should not decrease quality below 0", () => {
      const gildedRose = new GildedRose([new NormalItem(5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("Normal items degrade twice as fast after sellIn <= 0", () => {
      const gildedRose = new GildedRose([new NormalItem(0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[0].sellIn).toBe(-1);
    });

    it("Normal items'quality decreae of 2 if sellIn < 0 ", () => {
      const gildedRose = new GildedRose([new NormalItem(-1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[0].sellIn).toBe(-2);
    });
  });

  describe("Agent Brie", () => {
    it("Aged Brie should increase in quality", () => {
      const gildedRose = new GildedRose([new AgedBrieItem(2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(1);
      expect(items[0].sellIn).toBe(1);
    });

    it("Aged Brie should not increase quality above 50", () => {
      const gildedRose = new GildedRose([new AgedBrieItem(2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it("Aged Brie increases faster after expiration", () => {
      const gildedRose = new GildedRose([new AgedBrieItem(0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12); // +2 car expiré
      expect(items[0].sellIn).toBe(-1);
    });
  });

  describe("Sulfuras", () => {
    it("Sulfuras should not decrease in quality or sellIn", () => {
      const gildedRose = new GildedRose([new SulfurasItem(0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(0);
    });
  });

  describe("Backstage", () => {
    it("Backstage passes should increase in quality by 1 when sellIn > 10", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(21);
      expect(items[0].sellIn).toBe(14);
    });

    it("Backstage passes should increase in quality by 2 when 10 >= sellIn > 5", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(27);
      expect(items[0].sellIn).toBe(9);
    });

    it("Backstage passes should increase in quality by 3 when 5 >= sellIn > 0", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(33);
      expect(items[0].sellIn).toBe(4);
    });

    it("Backstage passes should drop quality to 0 after concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-1);
    });

    it("Quality never exceeds 50 even with Backstage passes", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50); // pas 52
    });

    it("Backstage items'quality becomes 0 if sellIn < 0 ", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-2);
    });
  });
});
