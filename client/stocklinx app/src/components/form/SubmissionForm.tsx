import React from 'react'
import { IBaseProduct, IUser } from '../../interfaces/interfaces'
import { Document, Page, Text, View, StyleSheet, Canvas, Font } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

interface SubmissionFormProps {
    products?: IBaseProduct[];
    user?: IUser;
}
const SubmissionForm: React.FC<SubmissionFormProps> = (
) => {
    const styles = StyleSheet.create({
        document: {
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        pageContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            fontSize: 10,
            padding: 30,
            fontFamily: 'Roboto',
        },
        pageContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            border: '1px solid black',
        },
        userInfoContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
        },
        userInfoRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'auto',
        },
        title: {
            display: 'flex',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            padding: 8,
            borderBottom: '1px solid black',
            backgroundColor: '#dfdfdf70',
        },
        betweenTitle: {
            display: 'flex',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            padding: 8,
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            backgroundColor: '#dfdfdf70',
        },
        column: {
            display: 'flex',
            textAlign: 'left',
            width: '100%',
            height: 'auto',
            padding: 8,
            backgroundColor: '#dfdfdf70',
        },
        value: {
            display: 'flex',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            padding: 8,
            backgroundColor: '#dfdfdf70',
        },
        input: {
            display: 'flex',
            textAlign: 'center',
            width: '100%',
            height: 'auto',
            padding: 8,
            flexGrow: 1,
        },
        productContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
        },
        productContent: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'auto',
        },
        productColumn: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
        },
        descriptionContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
        },
        description: {
            display: 'flex',
            width: '100%',
            height: 'auto',
            padding: 8,
            lineHeight: 1.5,
        },
        signatureContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'auto',
        },
        descriptionSignature: {
            display: 'flex',
            flexDirection: 'column',
            width: 'auto',
            height: 'auto',
            padding: 8,
            gap: 5,
        },
        descriptionRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'auto',
            gap: 20,
        },
        descriptionColumn: {
            display: 'flex',
            width: 100,
            height: 'auto',
            textAlign: 'left',
        },
        descriptionValue: {
            display: 'flex',
            width: '100%',
            height: 'auto',
            textAlign: 'left',
        },
        signature: {
            display: 'flex',
            width: 'auto',
            height: 50,
        },
        xWrapper: {
            width: '100%',
            height: 1,
            borderBottom: '1px solid black',
        },
        yWrapper: {
            width: 1,
            height: '100%',
            backgroundColor: 'black',
        },
        signatureWrapper: {
            width: 400,
        },
    });

    const Description = (
        <View style={styles.signatureContainer}>
            <View style={styles.descriptionSignature}>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>Teslim Alan Personel</Text>
                </View>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>İsim Soyisim : </Text>
                    <Text style={styles.descriptionValue}>İzzet Çakar</Text>
                </View>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>İmza :</Text>
                    <View style={styles.signature} />
                </View>
            </View>
            <View style={styles.signatureWrapper} />
            <View style={styles.descriptionSignature}>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>Teslim Eden Personel</Text>
                </View>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>İsim Soyisim : </Text>
                    <Text style={styles.descriptionValue}>İzzet Çakar</Text>
                </View>
                <View style={styles.descriptionRow}>
                    <Text style={styles.descriptionColumn}>İmza : </Text>
                    <View style={styles.signature} />
                </View>
            </View>
        </View>
    )


    const MyDocument = () => (
        <Document style={styles.document} pageLayout='singlePage' title='Personel Zimmet Formu'>
            <Page size="A4" style={styles.pageContainer} >
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Personel Zimmet Formu</Text>
                    <View style={styles.userInfoContainer}>
                        <View style={styles.userInfoRow}>
                            <Text style={styles.column}>Personel Adı Soyadı</Text>
                            <View style={styles.yWrapper} />
                            <Text style={styles.input}>İzzet Çakar</Text>
                        </View>
                        <View style={styles.xWrapper} />
                        <View style={styles.userInfoRow}>
                            <Text style={styles.column}>Departman/Grup</Text>
                            <View style={styles.yWrapper} />
                            <Text style={styles.input}>Özyer Group</Text>
                        </View>
                        <View style={styles.xWrapper} />
                        <View style={styles.userInfoRow}>
                            <Text style={styles.column}>İşe Giriş Tarihi</Text>
                            <View style={styles.yWrapper} />
                            <Text style={styles.input}>12/12/2023</Text>
                        </View>
                        <View style={styles.xWrapper} />
                        <View style={styles.userInfoRow}>
                            <Text style={styles.column}>Unvan</Text>
                            <View style={styles.yWrapper} />
                            <Text style={styles.input}>Software Engineer</Text>
                        </View>
                    </View>
                    <View style={styles.productContainer}>
                        <Text style={styles.betweenTitle}>Zimmetlenen Malzemeler</Text>
                        <View style={styles.productContent}>
                            <View style={[styles.productColumn, { width: 200 }]}>
                                <Text style={styles.value}>Ürün</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.column}>Notebook</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.column}>Desktop</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.column}>All In One</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.column}>Phone</Text>
                            </View>
                            <View style={styles.yWrapper} />
                            <View style={styles.productColumn}>
                                <Text style={styles.value}>Model</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                            </View>
                            <View style={styles.yWrapper} />
                            <View style={styles.productColumn}>
                                <Text style={styles.value}>Açıklama</Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                                <View style={styles.xWrapper} />
                                <Text style={styles.input}></Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.xWrapper} />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>Yukarıda yazılı malzemeleri 12/12/2023 tarihinde teslim aldım. Bu tarihten itibaren verilen ürüne gelecek olan zarardan şahsım sorumludur.
                        </Text>
                        {Description}
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.betweenTitle}>Teslim Beyanı</Text>
                        <Text style={styles.description}>12/12/2023 tarihinde işten ayrıldığımı ve işe giriş tarihinde şahsıma zimmetlenmiş , yukarıda belirtilmiş malzemeleri eksiksiz ve sorunsuz teslim ettiğimi beyan ederim.
                        </Text>
                        {Description}
                    </View>
                </View>
            </Page>
        </Document>
    );
    return (
        <PDFViewer width={"100%"} height={"100%"}>
            <MyDocument />
        </PDFViewer>
    )

}

export default SubmissionForm
