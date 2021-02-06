import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card } from 'antd'

class ComponentToPrint extends React.Component {
    render() {
        return (
            <div>
                <div style={{fontSize:"20px",color:"yellow"}}>
                    <h1>ENG</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div style={{fontSize:"20px",color:"red"}}>
                    <h1>CH</h1>
                    <p>
                        也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。
                    </p>
                </div>
                <div>
                    <h1>IMG</h1>
                    <img alt="" width="100%" src="https://img2.thaipng.com/20180812/rrq/kisspng-word-travel-search-vector-graphics-hotel-ultimate-tour-travel-png-elements-peoplepng-com-5b6ff8f6324ec1.4157354515340648862061.jpg"></img>
                </div>
            </div>
        );
    }
}

const Example = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Card bordered={false} style={{ width: '100%' }}>
            <div>
                <button onClick={handlePrint}>Print this out!</button>
                <ComponentToPrint ref={componentRef} />
            </div>
        </Card >

    );
};

export default Example;