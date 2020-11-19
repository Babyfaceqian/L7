import { PointLayer, Scene } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import * as React from 'react';
export default class PointImage extends React.Component {
  // @ts-ignore
  private scene: Scene;

  public componentWillUnmount() {
    this.scene.destroy();
  }

  public async componentDidMount() {
    const response = await fetch(
      'https://gw.alipayobjects.com/os/basement_prod/893d1d5f-11d9-45f3-8322-ee9140d288ae.json',
    );
    const scene = new Scene({
      id: 'map',
      map: new Mapbox({
        center: [121.4, 31.258134],
        zoom: 15,
        pitch: 0,
        style: 'dark',
      }),
    });
    this.scene = scene;
    scene.addImage(
      '00',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*Rq6tQ5b4_JMAAAAAAAAAAABkARQnAQ',
    );
    scene.addImage(
      '01',
      'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*0D0SQ6AgkRMAAAAAAAAAAABkARQnAQ',
    );
    scene.addImage(
      '02',
      'https://gw.alipayobjects.com/zos/rmsportal/xZXhTxbglnuTmZEwqQrE.png',
    );
    const i = 0;
    const data = await response.json();
    const newData = data.map((item: any) => {
      item.type = '00';
      return item;
    });
    const imageLayer = new PointLayer()
      .source(newData, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('type', (v: any) => {
        return v;
      })
      // .shape('triangle')
      // .color('red')
      .active(true)
      .size(20)
      .style({
        offsets: [40, 40],
      });
    // imageLayer.on('click', (e) => {
    //   console.log(e);
    // });

    const imageLayer2 = new PointLayer()
      .source(newData, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('type', (v: any) => {
        return v;
      })
      // .shape('triangle')
      // .color('red')
      .active(true)
      .size(10);
    scene.addLayer(imageLayer);
    scene.addLayer(imageLayer2);
  }

  public render() {
    return (
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'scale(0.8)',
        }}
      />
    );
  }
}
