export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality(amount: number) {
    //amount can be positive and negative
    this.quality = this.quality + amount;
  }

  updateItemQualityAndSellIn() {
    //add code here for common behavior to all subclasses
  }
}

export class NormalItem extends Item {
  constructor(sellIn, quality) {
    super("Normal Item", sellIn, quality);
  }

  updateItemQualityAndSellIn() {
    this.sellIn = this.sellIn - 1;

    if (this.quality > 0) {
      this.updateQuality(-1);
    }

    if (this.sellIn < 0) {
      if (this.quality > 0) {
        this.updateQuality(-1);
      }
    }
  }
}

export class AgedBrieItem extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateItemQualityAndSellIn() {
    if (this.quality < 50) {
      this.updateQuality(1);
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.updateQuality(1);
      }
    }
  }
}

export class SulfurasItem extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateItemQualityAndSellIn() {
    if (this.sellIn < 0) {
      if (this.quality > 0) {
        if (this.name != "Sulfuras, Hand of Ragnaros") {
          this.updateQuality(-1);
        }
      }
    }
  }
}

export class BackstageItem extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateItemQualityAndSellIn() {
    if (this.quality < 50) {
      this.updateQuality(1);
      if (this.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (this.sellIn < 11) {
          if (this.quality < 50) {
            this.updateQuality(1);
          }
        }
        if (this.sellIn < 6) {
          if (this.quality < 50) {
            this.updateQuality(1);
          }
        }
      }
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn < 0) {
      this.quality = this.quality - this.quality;
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.map((item: Item) => {
      item.updateItemQualityAndSellIn();
    });
    return this.items;
  }
}
