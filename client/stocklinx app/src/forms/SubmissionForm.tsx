import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  document: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    fontSize: 10,
    padding: 30,
    fontFamily: "Roboto",
  },
  pageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "auto",
    border: "1px solid black",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
  userInfoRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
  },
  title: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: "auto",
    padding: 8,
    borderBottom: "1px solid black",
    backgroundColor: "#dfdfdf70",
  },
  betweenTitle: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: "auto",
    padding: 8,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    backgroundColor: "#dfdfdf70",
  },
  column: {
    display: "flex",
    textAlign: "left",
    width: "100%",
    height: "auto",
    padding: 8,
    backgroundColor: "#dfdfdf70",
  },
  value: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: "auto",
    padding: 8,
    backgroundColor: "#dfdfdf70",
  },
  input: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: "auto",
    padding: 8,
    flexGrow: 1,
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
  productContent: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
  },
  productColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "auto",
  },
  description: {
    display: "flex",
    width: "100%",
    height: "auto",
    padding: 8,
    lineHeight: 1.5,
  },
  signatureContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto",
  },
  descriptionSignature: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: 8,
    gap: 5,
  },
  descriptionRow: {
    display: "flex",
    flexDirection: "row",
    height: "auto",
  },
  descriptionColumn: {},
  descriptionValue: {},
  signature: {
    display: "flex",
    width: "auto",
    height: 50,
  },
  xWrapper: {
    width: "100%",
    height: 1,
    borderBottom: "1px solid black",
  },
  yWrapper: {
    width: 1,
    height: "100%",
    backgroundColor: "black",
  },
  signatureWrapper: {
    maxWidth: 400,
  },
});

export interface ProductProps {
  category: string;
  title: string;
  description: string;
}
export interface SubmissionFormProps {
  userFullName: string;
  delivererFullName: string;
  companyName: string;
  department: string;
  userStartDate: string;
  userTitle: string;
  products: ProductProps[];
  assignDate: string;
}

const Description = ({
  delivererFullName,
  userFullName,
}: {
  delivererFullName: string;
  userFullName: string;
}) => (
  <View style={styles.signatureContainer}>
    <View style={styles.descriptionSignature}>
      <View style={styles.descriptionRow}>
        <Text style={styles.descriptionColumn}>Teslim Alan Personel</Text>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={styles.descriptionColumn}>İsim Soyisim : </Text>
        <Text style={styles.descriptionValue}>{userFullName}</Text>
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
        <Text style={styles.descriptionValue} wrap>
          {delivererFullName}
        </Text>
      </View>
      <View style={styles.descriptionRow}>
        <Text style={styles.descriptionColumn}>İmza : </Text>
        <View style={styles.signature} />
      </View>
    </View>
  </View>
);

const formatDate = (dateString: string) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

  return formattedDate;
};

const SubmissionForm = ({
  delivererFullName,
  userFullName,
  userTitle,
  userStartDate,
  department,
  products,
  assignDate,
}: SubmissionFormProps) => (
  <Document
    style={styles.document}
    pageLayout="singlePage"
    title="Personel Zimmet Formu"
  >
    <Page size="A4" style={styles.pageContainer}>
      <View style={styles.pageContent}>
        <Text style={styles.title}>Personel Zimmet Formu</Text>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoRow}>
            <Text style={styles.column}>Personel Adı Soyadı</Text>
            <View style={styles.yWrapper} />
            <Text style={styles.input}>{userFullName}</Text>
          </View>
          <View style={styles.xWrapper} />
          <View style={styles.userInfoRow}>
            <Text style={styles.column}>Şube/Departman</Text>
            <View style={styles.yWrapper} />
            <Text style={styles.input}>{department}</Text>
          </View>
          <View style={styles.xWrapper} />
          <View style={styles.userInfoRow}>
            <Text style={styles.column}>İşe Giriş Tarihi</Text>
            <View style={styles.yWrapper} />
            <Text style={styles.input}>{formatDate(userStartDate)}</Text>
          </View>
          <View style={styles.xWrapper} />
          <View style={styles.userInfoRow}>
            <Text style={styles.column}>Unvan</Text>
            <View style={styles.yWrapper} />
            <Text style={styles.input}>{userTitle}</Text>
          </View>
        </View>
        <View style={styles.productContainer}>
          <Text style={styles.betweenTitle}>Zimmetlenen Malzemeler</Text>
          <View style={styles.productContent}>
            <View style={[styles.productColumn, { width: 200 }]}>
              <Text style={styles.value}>Ürün</Text>
              {products.map((product, index) => {
                return (
                  <View key={index}>
                    <View style={styles.xWrapper} />
                    <Text style={styles.column}>{product.category}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.yWrapper} />
            <View style={styles.productColumn}>
              <Text style={styles.value}>Model</Text>
              {products.map((product, index) => {
                return (
                  <View key={index}>
                    <View style={styles.xWrapper} />
                    <Text style={styles.input}>{product.title}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.yWrapper} />
            <View style={styles.productColumn}>
              <Text style={styles.value}>Açıklama</Text>
              {products.map((product, index) => {
                return (
                  <View key={index}>
                    <View style={styles.xWrapper} />
                    <Text style={styles.input}>{product.description}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.xWrapper} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Yukarıda yazılı malzemeleri {formatDate(assignDate)} tarihinde
            teslim aldım. Bu tarihten itibaren verilen ürüne gelecek olan
            zarardan şahsım sorumludur.
          </Text>
          {Description({ delivererFullName, userFullName })}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.betweenTitle}>Teslim Beyanı</Text>
          <Text style={styles.description}>
            {formatDate(assignDate)} tarihinde işten ayrıldığımı ve işe giriş
            tarihinde şahsıma zimmetlenmiş , yukarıda belirtilmiş malzemeleri
            eksiksiz ve sorunsuz teslim ettiğimi beyan ederim.
          </Text>
          {Description({ delivererFullName, userFullName })}
        </View>
      </View>
    </Page>
  </Document>
);
export default SubmissionForm;
